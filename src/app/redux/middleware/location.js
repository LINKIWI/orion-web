import { FETCH_LOCATIONS, loadLocations } from 'app/redux/actions/location';
import { setViewport, setAnimation } from 'app/redux/actions/map';
import { startProgress, endProgress } from 'app/redux/actions/progress';
import createMiddleware from 'app/redux/middleware/create-middleware';
import resource from 'app/util/resource';
import { fitMapBounds } from 'vis/coordinate';

/**
 * Start an XHR to fetch location data from the server with the parameters currently in the store.
 */
const fetchLocationsMiddleware = (store) => {
  const {
    dataSource: { user, device },
    filters: { accuracyThreshold },
    map: { viewport },
  } = store.getState();

  // Don't attempt to fetch location data if a user and device aren't specified
  if (!user || !device) {
    return;
  }

  const opts = {
    endpoint: 'api/locations',
    method: 'GET',
    data: {},
  };

  store.dispatch(startProgress());
  resource(opts, (err, raw = []) => {
    const json = raw.filter((entry) => entry.user === user);
    if (json.length) {
      const {
        center: [longitude, latitude],
        zoom,
      } = fitMapBounds(json || [], accuracyThreshold, viewport.width, viewport.height);
      store.dispatch(setAnimation(true));
      store.dispatch(setViewport({ ...viewport, latitude, longitude, zoom }));
    }

    store.dispatch(loadLocations(json));
    store.dispatch(endProgress());
  });
};

const middlewareMapping = {
  [FETCH_LOCATIONS]: fetchLocationsMiddleware,
};

export default createMiddleware(middlewareMapping);
