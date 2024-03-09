import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import CardThumbnail from '../CardThumbnail';

const index = 0;
const onPress = jest.fn();
const data = {
  name: 'data name',
  image: 'file://image-path-here.jpg',
};
const actions = (
  <>
    <Text>Sample action 1</Text>
    <Text>Sample action 2</Text>
  </>
);

describe('CardThumbnail', () => {
  test('renders correctly with default settings', () => {
    const component = renderer.create(
      <CardThumbnail
        index={index}
        onPress={onPress}
        data={data}
        actions={actions}
      />
    );
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with fullWidth = false', () => {
    const component = renderer.create(
      <CardThumbnail
        index={index}
        onPress={onPress}
        data={data}
        actions={actions}
        fullWidth={false}
      />
    );
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with fullWidth = true', () => {
    const component = renderer.create(
      <CardThumbnail
        index={index}
        onPress={onPress}
        data={data}
        actions={actions}
        fullWidth={true}
      />
    );
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
