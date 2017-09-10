import sinon from 'sinon';
import ReactDOM from 'react-dom';

describe('Entry', () => {
  test('Rendering into DOM node', () => {
    const renderStub = sinon.stub(ReactDOM, 'render');

    require('resources/templates/entry');  // eslint-disable-line global-require
    expect(renderStub.called).toBe(true);

    renderStub.restore();
  });
});
