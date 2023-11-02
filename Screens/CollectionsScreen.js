import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';

const CollectionsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('CreateCollection')}
        >
        <Text style={styles.buttonText}>Create a collection</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CollectionsScreen;
