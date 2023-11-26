import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { getCollections } from '../Storage/Storage';

const CollectionViewScreen = ({ navigation }) => {
  const {collection} = navigation.params;

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
