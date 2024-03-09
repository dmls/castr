import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import DeleteButton from '../DeleteButton';

const callback = () => { /* callback code */ };
const label = 'LABEL';
const navigate = 'NAV_TO';

const sleepTime = 1;
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

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
    
    await sleep(sleepTime);
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

    await sleep(sleepTime);
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
    
    await sleep(sleepTime);
  });
});
