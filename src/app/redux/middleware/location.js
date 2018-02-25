import { FETCH_LOCATIONS, loadLocations } from 'app/redux/actions/location';
import { setViewport } from 'app/redux/actions/map';
import { startProgress, endProgress } from 'app/redux/actions/progress';
import createMiddleware from 'app/redux/middleware/create-middleware';
import resource, { EREQUESTDEDUPLICATION } from 'app/util/resource';
import { fitMapBounds } from 'vis/coordinate';

/**
 * Start an XHR to fetch location data from the server with the parameters currently in the store.
 */
const fetchLocationsMiddleware = (store) => {
  const {
    context: { width, height },
    dataSource: { user, device, timestamp },
    filters: { accuracyThreshold },
    map: { viewport },
  } = store.getState();

  // Don't attempt to fetch location data if a user and device aren't specified
  if (!user || !device) {
    return;
  }

  const opts = {
    id: 'locations',
    endpoint: '/api/locations',
    method: 'POST',
    data: {
      user,
      device,
      timestamp_start: timestamp.start,
      timestamp_end: timestamp.end,
      limit: null,
      fields: ['accuracy', 'timestamp', 'latitude', 'longitude'],
    },
  };

  store.dispatch(startProgress());
  resource(opts, (err, json = []) => {
    if (err && err.code === EREQUESTDEDUPLICATION) {
      return;
    }

    if (json.length) {
      const {
        center: [longitude, latitude],
        zoom,
      } = fitMapBounds(json, accuracyThreshold, width, height);

      store.dispatch(setViewport({
        ...viewport,
        // Override position properties to fit the map bounds to the displayed data
        latitude,
        longitude,
        zoom: zoom - 0.5,
        // Trigger a transition
        transitionDuration: 1500,
      }));
    }

    store.dispatch(loadLocations(json));
    store.dispatch(endProgress());
  });
};

const middlewareMapping = {
  [FETCH_LOCATIONS]: fetchLocationsMiddleware,
};

export default createMiddleware(middlewareMapping);
