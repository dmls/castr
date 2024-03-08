import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import DeleteButton from '../DeleteButton';

const callback= () => { /* callback code */ };
const label = 'LABEL';
const navigate = 'NAV_TO';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('DeleteButton', () => {
  test('renders correctly with default settings', () => {
    const component = renderer.create(
      <NavigationContainer>
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
        />
      </NavigationContainer>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with textOnly = false', () => {
    const component = renderer.create(
      <NavigationContainer>
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
          textOnly={false}
        />
      </NavigationContainer>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with textOnly = true', () => {
    const component = renderer.create(
      <NavigationContainer>
        <DeleteButton
          callback={callback}
          label={label}
          navigate={navigate}
          textOnly={true}
        />
      </NavigationContainer>
    );
    
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
