/**
 * Clip a number to be between a minimum and maximum bound.
 *
 * @param {number} min Minimum tolerable value.
 * @param {number} max Maximum tolerable value.
 * @return {Function} Unary function that returns the clipped value of its single argument.
 */
export const clip = (min, max) => (val) => Math.min(max, Math.max(val, min));

export default undefined;
