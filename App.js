import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CollectionsScreen from './Screens/CollectionsScreen';
import CollectionViewScreen from './Screens/CollectionView';
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
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Collections" component={CollectionsScreen} />
        <Stack.Screen name="CollectionView" component={CollectionViewScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCollection" component={CreateCollectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
