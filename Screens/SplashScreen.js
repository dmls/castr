import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../assets/styles/Styles';

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('Collections');
  }, 1500);

  return (
    <View style={[styles.section, styles.sectionSplash]}>
      <Text style={styles.sectionSplashText}>castr</Text> 
    </View>
  );
}

export default SplashScreen;
