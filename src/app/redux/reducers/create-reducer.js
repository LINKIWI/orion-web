/**
 * Identity reducer that map the state to itself (e.g., effects no changes).
 *
 * @param {Object} state Current state to duplicate.
 */
const identityReducer = (state) => state;

/**
 * Create a reducer function from a mapping of action types to reducer functions, and an initial
 * state declaration.
 *
 * @param {Object} reducerMapping Map of action type names to state reduction functions.
 * @param {Object} initialState The initial state for this reducer.
 */
const createReducer = (reducerMapping, initialState) => (state = initialState, action) =>
  (reducerMapping[action.type] || identityReducer)(state, action);

export default createReducer;
