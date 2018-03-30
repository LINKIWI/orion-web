export const SET_USER = 'SET_USER';
export const SET_DEVICE = 'SET_DEVICE';
export const SET_TIMESTAMP_START = 'SET_TIMESTAMP_START';
export const SET_TIMESTAMP_END = 'SET_TIMESTAMP_END';

/**
 * Set the user whose data should be queried.
 *
 * @param {string} user Username.
 * @return {Object} Action for setting the current user.
 */
export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

/**
 * Set the device corresponding to the selected user.
 *
 * @param {string} device Device name for the current user.
 * @return {Object} Action for setting the current device.
 */
export const setDevice = (device) => ({
  type: SET_DEVICE,
  payload: { device },
});

/**
 * Set the beginning timestamp range for queried data.
 *
 * @param {number} timestamp Unix timestamp denoting the beginning range.
 * @return {Object} Action for setting the starting timestamp.
 */
export const setTimestampStart = (timestamp) => ({
  type: SET_TIMESTAMP_START,
  payload: { timestamp },
});

/**
 * Set the ending timestamp range for queried dat.
 *
 * @param {number} timestamp Unix timestamp denoting the ending range.
 * @return {Object} Action for setting the ending timestamp.
 */
export const setTimestampEnd = (timestamp) => ({
  type: SET_TIMESTAMP_END,
  payload: { timestamp },
});
