import {
  setUser,
  setDevice,
  setTimestampStart,
  setTimestampEnd,
  SET_USER,
  SET_DEVICE,
  SET_TIMESTAMP_START,
  SET_TIMESTAMP_END,
} from 'app/redux/actions/data-source';

describe('Data source actions', () => {
  test('Set user', () => {
    expect(setUser('user')).toEqual({
      type: SET_USER,
      payload: { user: 'user' },
    });
  });

  test('Set device', () => {
    expect(setDevice('device')).toEqual({
      type: SET_DEVICE,
      payload: { device: 'device' },
    });
  });

  test('Set timestamp start', () => {
    expect(setTimestampStart(1)).toEqual({
      type: SET_TIMESTAMP_START,
      payload: { timestamp: 1 },
    });
  });

  test('Set timestamp end', () => {
    expect(setTimestampEnd(1)).toEqual({
      type: SET_TIMESTAMP_END,
      payload: { timestamp: 1 },
    });
  });
});
