import errorReporter from 'app/redux/middleware/error-reporter';
import locationMiddleware from 'app/redux/middleware/location';

const middleware = [
  errorReporter,
  locationMiddleware,
];

export default middleware;
