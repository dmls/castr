import React from 'react';

const navTitleCustom = (navigation, title) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || '',
    });
  }, [navigation, title]);
};

export default navTitleCustom;
