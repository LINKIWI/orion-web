export const SET_VIEWPORT = 'SET_VIEWPORT';

/**
 * Set the map viewport parameters.
 *
 * @param {Object} viewport Viewport description object from Mapbox.
 * @return {Object} Action for setting the map viewport, shared across the map itself and the data
 *                  visualization layer.
 */
export const setViewport = (viewport) => ({
  type: SET_VIEWPORT,
  payload: { viewport },
});
