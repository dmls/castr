import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles, colors } from '../assets/styles/Styles';

export default DeleteButton = ({ callback, label, navigate, textOnly = false }) => {
  const navigation = useNavigation();
  
  const handlePress = (callback) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${label}?`,
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: async () => {
          const del = await callback();
          navigation.navigate(navigate.screen, navigate.args);
        } },
      ]
    );
  };

  const config = !textOnly ? {
    touchableOpacity: [styles.button, styles.buttonDanger],
    text: styles.buttonText,
  } : {
    text: {color: colors.danger},
  };

  return (
    <TouchableOpacity
      style={config.touchableOpacity}
      activeOpacity={0.5}
      onPress={() => handlePress(callback)}
    >
      <Text style={config.text}>Delete</Text>
    </TouchableOpacity>
  );
}
