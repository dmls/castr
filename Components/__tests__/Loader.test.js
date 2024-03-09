import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader';

describe('Loader', () => {
  test('renders correctly with default settings', () => {
    const component = renderer.create(
      <Loader />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with loading = false', () => {
    const component = renderer.create(
      <Loader loading={false} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with loading = true', () => {
    const component = renderer.create(
      <Loader loading={true} />
    );
    
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
