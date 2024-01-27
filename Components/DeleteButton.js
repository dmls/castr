import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { deleteCollections, deleteCharacter } from '../Storage/Storage';

export const DeleteButton = ({ type, record, navigation, textOnly }) => {
  const handlePress = (callback) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${record.name}?`,
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: async () => {
          const del = await callback([records]);
          navigation.push('Collections');
        } },
      ]
    );
  };

  const callback = {
    'collections': deleteCollections(),
    'characters': deleteCharacters(),
  }[type];

  return (
    <TouchableOpacity
      style={textOnly ? null : [styles.button, styles.buttonDanger]}
      activeOpacity={0.5}
      onPress={handlePress(callback)}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
}
