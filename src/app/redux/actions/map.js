export const SET_VIEWPORT = 'SET_VIEWPORT';
export const SET_ANIMATION = 'SET_ANIMATION';

export const setViewport = (viewport) => ({
  type: SET_VIEWPORT,
  payload: { viewport },
});

export const setAnimation = (isEnabled) => ({
  type: SET_ANIMATION,
  payload: { isEnabled },
});
