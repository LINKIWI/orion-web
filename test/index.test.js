import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('Entry', () => {
  test('Rendering into DOM node', () => {
    require('index');  // eslint-disable-line global-require
    expect(ReactDOM.render).toBeCalled();
  });
});
