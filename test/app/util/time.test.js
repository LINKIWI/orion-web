import { dateToUnixTimestamp, unixTimestampToDate } from 'app/util/time';

describe('Time util', () => {
  test('Converting date representation to Unix timestamp', () => {
    expect(dateToUnixTimestamp('2018-02-18')).toBe(1518912000);
  });

  test('Conerting Unix timestamp to date representation', () => {
    expect(unixTimestampToDate(1518988499424 / 1000)).toBe('2018-02-18');
  });
});
