import React from 'react';
import { shallow } from 'enzyme';
import Root from 'app/react/components/root';
import RootContainer from 'app/react/containers/root';

describe('[Container] Root', () => {
  test('Basic rendering', () => {
    const root = shallow(
      <RootContainer />,
    );

    expect(root.find(Root).length).toBe(1);
  });
});
