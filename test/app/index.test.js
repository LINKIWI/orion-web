import React from 'react';
import { shallow } from 'enzyme';
import App from 'app';
import Root from 'app/react/root';

describe('Application root', () => {
  test('Global providers are initialized', () => {
    const app = shallow(
      <App />,
    );

    expect(app.find('Provider').length).toBe(1);
    expect(app.find('Elemental').length).toBe(1);
    expect(app.find('BrowserRouter').length).toBe(1);
    expect(app.find(Root).length).toBe(1);
  });
});
