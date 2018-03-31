import { setLocationDisplayType } from 'app/redux/actions/options';
import optionsReducer, {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';

describe('Options reducer', () => {
  test('Set location display type', () => {
    const locationDisplayTypes = [
      LOCATION_DISPLAY_TYPE_DOTS,
      LOCATION_DISPLAY_TYPE_PATH,
      LOCATION_DISPLAY_TYPE_HEATMAP,
    ];

    locationDisplayTypes.forEach((displayType) => {
      const state = {};
      const action = setLocationDisplayType(displayType);

      const expectState = { locationDisplayType: displayType };
      const reducedState = optionsReducer(state, action);

      expect(reducedState).toEqual(expectState);
    });
  });
});
