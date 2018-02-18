import { unselectable } from 'app/util/style';

describe('Style util', () => {
  test('Unselectable style object constant', () => {
    expect(unselectable.MozUserSelect).toBe('none');
    expect(unselectable.MsUserSelect).toBe('none');
    expect(unselectable.WebkitUserSelect).toBe('none');
    expect(unselectable.userSelect).toBe('none');
  });
});
