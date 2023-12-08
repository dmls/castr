import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { deleteCollections } from '../Storage/Storage';

const DeleteCollectionButton = ({ collection, navigation }) => {
  const handlePress = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${collection.name}?`,
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: async () => {
          const del = await deleteCollections([collection.name]);
          navigation.push('Collections');
        } },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonDanger]}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
}

export default DeleteCollectionButton;
