import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { deleteCollections } from '../Storage/Storage';

const DeleteCollectionButton = ({ collection, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonDanger]}
      activeOpacity={0.5}
      onPress={() => deleteCollections([collection.name]) && navigation.push('Collections')}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
}

export default DeleteCollectionButton;
