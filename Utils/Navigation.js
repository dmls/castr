import React from 'react';
import { useNavigation } from '@react-navigation/native';

const navTitleCustom = (title) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || '',
    });
  }, [navigation, title]);
};


const navGetPrevScreen = () => {
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  return prevRoute;
};


export { navTitleCustom, navGetPrevScreen };
