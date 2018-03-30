export const SET_ACCURACY_FILTER = 'SET_ACCURACY_FILTER';

/**
 * Set the location point accuracy filter threshold value.
 *
 * @param {number} threshold Threshold accuracy (in meters) below which points should be
 *                           filtered out.
 * @return {Object} Action for setting the accuracy filter threshold.
 */
export const setAccuracyFilter = (threshold) => ({
  type: SET_ACCURACY_FILTER,
  payload: { threshold },
});
