import { fetchLocations, loadLocations } from 'app/redux/actions/location';
import { startProgress } from 'app/redux/actions/progress';
import locationMiddleware from 'app/redux/middleware/location';
import resource, { EREQUESTDEDUPLICATION } from 'app/util/resource';

jest.mock('app/util/resource', () => jest.fn());

const DEFAULT_STATE = {
  context: {
    width: 10,
    height: 100,
  },
  dataSource: {
    user: 'user',
    device: 'device',
    timestamp: {
      start: 1,
      end: 10,
    },
  },
  filters: {
    accuracyThreshold: 5,
  },
  map: {
    viewport: {},
  },
};

describe('Location middleware', () => {
  test('Noop if user or device is not defined', () => {
    const store = {
      getState: () => ({
        ...DEFAULT_STATE,
        dataSource: {
          ...DEFAULT_STATE.dataSource,
          device: null,
        },
      }),
    };
    const next = jest.fn(() => 'result');
    const action = fetchLocations();

    locationMiddleware(store)(next)(action);

    expect(resource).not.toBeCalled();
  });

  test('Noop if resource is duplicated', () => {
    const mockDispatch = jest.fn();
    const store = {
      getState: () => DEFAULT_STATE,
      dispatch: mockDispatch,
    };
    const next = jest.fn(() => 'result');
    const action = fetchLocations();

    resource.mockImplementation((opts, cb) => cb({ code: EREQUESTDEDUPLICATION }));

    locationMiddleware(store)(next)(action);

    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith(startProgress());
  });

  test('No locations are loaded if there is an error', () => {
    const mockDispatch = jest.fn();
    const store = {
      getState: () => DEFAULT_STATE,
      dispatch: mockDispatch,
    };
    const next = jest.fn(() => 'result');
    const action = fetchLocations();

    resource.mockImplementation((opts, cb) => cb());

    locationMiddleware(store)(next)(action);

    expect(mockDispatch).toBeCalledWith(loadLocations([]));
  });

  test('Successful loading of fetched locations', () => {
    const mockDispatch = jest.fn();
    const store = {
      getState: () => DEFAULT_STATE,
      dispatch: mockDispatch,
    };
    const next = jest.fn(() => 'result');
    const action = fetchLocations();
    const mockLocations = [{ latitude: 1, longitude: 2, accuracy: 3 }];

    resource.mockImplementation((opts, cb) => cb(null, mockLocations));

    locationMiddleware(store)(next)(action);

    expect(mockDispatch).toBeCalledWith(loadLocations(mockLocations));
  });
});
