export const SET_USER = 'SET_USER';
export const SET_DEVICE = 'SET_DEVICE';
export const SET_TIMESTAMP_START = 'SET_TIMESTAMP_START';
export const SET_TIMESTAMP_END = 'SET_TIMESTAMP_END';

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export const setDevice = (device) => ({
  type: SET_DEVICE,
  payload: { device },
});

export const setTimestampStart = (timestamp) => ({
  type: SET_TIMESTAMP_START,
  payload: { timestamp },
});

export const setTimestampEnd = (timestamp) => ({
  type: SET_TIMESTAMP_END,
  payload: { timestamp },
});
