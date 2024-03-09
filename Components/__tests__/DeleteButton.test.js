import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { sleep } from '../../Test/Navigation';
import DeleteButton from '../DeleteButton';

const callback = () => { /* callback code */ };
const label = 'LABEL';
const navigate = 'NAV_TO';

describe('DeleteButton', () => {
  test('renders correctly with default settings', async () => {
    const component = renderer.create(
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
        />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
    await sleep();
  });

  test('renders correctly with textOnly = false', async () => {
    const component = renderer.create(
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
          textOnly={false}
        />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    await sleep();
  });

  test('renders correctly with textOnly = true', async () => {
    const component = renderer.create(
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
          textOnly={true}
        />
    );
    
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
    await sleep();
  });
});
