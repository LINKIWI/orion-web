import { FETCH_LOCATIONS, loadLocations } from 'app/redux/actions/location';
import { setViewport } from 'app/redux/actions/map';
import { startProgress, endProgress } from 'app/redux/actions/progress';
import createMiddleware from 'app/redux/middleware/create-middleware';
import resource, { EREQUESTDEDUPLICATION } from 'app/util/resource';
import { fitMapBounds } from 'vis/coordinate';

// Stateful record of the most recent locations request.
// Used to reject UI updates that are stale (superseded by a more recent request).
let locationLoadID = 0;

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

  // There can be multiple, concurrent instances of this logic if there are multiple timestamp
  // ranges queried over a short amount of time. Keep a record of the current request ID to ensure
  // that only the most recent request is actually loaded into the global store.
  const request = ++locationLoadID;  // eslint-disable-line no-plusplus

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

      // The map fit is computationally intensive. It is possible that a new network request
      // completes before a prior request's computation has completed, at which point the current
      // request should be rejected (it has been superseded with a more recent request).
      if (request !== locationLoadID) {
        return;
      }

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
