import React from 'react';
import renderer from 'react-test-renderer';

import { print } from '../Debug';

describe('print function', () => {
  test('renders correctly with default settings', () => {
    const data = { key: 'value' };
    const component = renderer.create(print(data));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with pretty formatting', () => {
    const data = { key: 'value' };
    const component = renderer.create(print(data, true));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without pretty formatting', () => {
    const data = { key: 'value' };
    const component = renderer.create(print(data, false));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
