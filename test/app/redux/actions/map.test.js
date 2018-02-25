import { setViewport, SET_VIEWPORT } from 'app/redux/actions/map';

describe('Map actions', () => {
  test('Set viewport', () => {
    expect(setViewport({ location: true })).toEqual({
      type: SET_VIEWPORT,
      payload: { viewport: { location: true } },
    });
  });
});
