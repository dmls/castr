import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { deleteCollections } from '../Storage/Storage';

export const DeleteButton = ({ record, navigation, textOnly }) => {
  const handlePress = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${record.name}?`,
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: async () => {
          const del = await deleteCollections([record.id]);
          navigation.push('Collections');
        } },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={textOnly ? null : [styles.button, styles.buttonDanger]}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
}
