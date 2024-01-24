import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../assets/styles/Styles';

export const print = (data, pretty = true) => {
  return (
    <View style={styles.sectionRow}>
      <Text>{JSON.stringify(data, null, (pretty ? 2 : undefined)) }</Text>
    </View>
  );
};
