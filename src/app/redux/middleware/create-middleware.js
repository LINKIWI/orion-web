/**
 * Uninteresting noop middleware invoked when no middleware function matches the action type.
 */
const noop = () => {};

/**
 * Create a middleware function from a mapping of action types to middleware functions, each taking
 * as input the store and the triggering action.
 *
 * @param {Object} middlewareMapping Map of action type names to middleware functions.
 */
const createMiddleware = (middlewareMapping) => (store) => (next) => (action) => {
  (middlewareMapping[action.type] || noop)(store, action);
  return next(action);
};

export default createMiddleware;
