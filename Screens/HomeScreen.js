import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Component: home screen</Text>
      <Button
        title="Create a collection"
        onPress={() => navigation.navigate('CreateCollection')}
      />
    </View>
  );
}

export default HomeScreen;
