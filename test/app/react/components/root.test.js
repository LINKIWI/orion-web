import React from 'react';
import { shallow } from 'enzyme';
import Root from 'app/react/components/root';

describe('[Component] Root', () => {
  test('Basic rendering', () => {
    const root = shallow(
      <Root />,
    );

    expect(root.text()).toBe('root component');
  });
});
