import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Mock server URL injected into SPA as a global
process.env.ORION_SERVER_URL = 'https://example.com';

// Mock UTC time for all dates
Date.prototype.getTimezoneOffset = () => 0;  // eslint-disable-line no-extend-native
