import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

export const navTitleCustom = (title) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || '',
    });
  }, [navigation, title]);
};


export const navGetPrevScreen = () => {
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  return prevRoute;
};

export const navSetBackButton = (backScreen) => {
  const navigation = useNavigation();

  const handlePress = useCallback(
    () => navigation.navigate(backScreen),
    [navigation, backScreen]
  );

  const headerLeft = useCallback(
    () => <HeaderBackButton onPress={handlePress} />,
    [handlePress],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft,
    });
  }, [navigation, headerLeft]);

  return headerLeft;
};
