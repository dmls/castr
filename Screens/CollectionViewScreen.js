import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../assets/styles/Styles';

const CollectionViewScreen = ({ route }) => {
  const {collection} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.foo}>{collection}</Text>
        </View>
      </View>
    </View>
  );
}

export default CollectionViewScreen;
