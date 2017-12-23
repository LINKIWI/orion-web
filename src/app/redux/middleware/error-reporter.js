import Raven from 'raven-js';

/**
 * Sentry reporting middleware for errors that are thrown when executing Redux reducers in response
 * to dispatched actions. Since the error is explicitly try-caught, the error will not be duplicated
 * by the globally monkey-patched exception handler via Raven.config(...).install().
 */
const errorReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      Raven.captureException(err, {
        extra: {
          action,
          store: store.getState(),
        },
      });
    }

    throw err;
  }
};

export default errorReporter;
