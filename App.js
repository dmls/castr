import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { styles } from './assets/styles/Styles';

import CollectionsScreen from './Screens/CollectionsScreen';
import SplashScreen from './Screens/SplashScreen';
import CreateCollectionScreen from './Screens/CreateCollectionScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Collections">
        <Stack.Screen name="Collections" component={CollectionsScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="CreateCollection" component={CreateCollectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
