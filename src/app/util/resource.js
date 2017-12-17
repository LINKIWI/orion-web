const BASE_URL = process.env.ORION_SERVER_URL || '';

/**
 * Make a client-side request to a server-side endpoint.
 *
 * @param {string} endpoint Endpoint path.
 * @param {string} method HTTP verb for the request.
 * @param {Object} data Optional JSON request payload.
 * @param {Function} cb Callback function to invoke on completion.
 */
const resource = ({ endpoint, method, data }, cb) => fetch(`${BASE_URL}${endpoint}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  ...Object.keys(data).length &&
    !['HEAD', 'GET'].includes(method) &&
    { body: JSON.stringify(data) },
})
  .then((resp) => resp.json())
  .then(({ data: respData }) => cb(null, respData))
  .catch((err) => cb(err));

export default resource;
