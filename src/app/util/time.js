import humanize from 'humanize';

/**
 * Convert a local-timezone date representation (2017-12-17) into a Unix timestamp (in seconds).
 *
 * @param {string} dateRepr Date representation as created by an input with type date.
 * @return {number} Equivalent Unix timestamp, in seconds.
 */
export const dateToUnixTimestamp = (dateRepr) => {
  const date = new Date(dateRepr);
  const timestampMs = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  return timestampMs / 1000;
};

/**
 * Convert a Unix timestamp (in seconds) to a date representation (2017-12-17) in the local
 * timezone.
 *
 * @param {number} timestamp Unix timestamp, in seconds.
 * @return {string} Date representation of the timestamp, in the local timezone.
 */
export const unixTimestampToDate = (timestamp) => humanize.date('Y-m-d', timestamp);
