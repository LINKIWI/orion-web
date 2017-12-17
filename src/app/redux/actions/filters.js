export const SET_ACCURACY_FILTER = 'SET_ACCURACY_FILTER';

export const setAccuracyFilter = (threshold) => ({
  type: SET_ACCURACY_FILTER,
  payload: { threshold },
});
