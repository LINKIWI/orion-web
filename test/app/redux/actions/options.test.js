import { setLocationDisplayType, SET_LOCATION_DISPLAY_TYPE } from 'app/redux/actions/options';

describe('Options actions', () => {
  test('Set location display type', () => {
    expect(setLocationDisplayType('type')).toEqual({
      type: SET_LOCATION_DISPLAY_TYPE,
      payload: { displayType: 'type' },
    });
  });
});
