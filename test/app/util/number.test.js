import { clip } from 'app/util/number';

describe('Number util', () => {
  test('Clip', () => {
    expect(clip(0, 10)(5)).toBe(5);
    expect(clip(0, 10)(11)).toBe(10);
    expect(clip(0, 10)(-2)).toBe(0);
  });
});
