import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { getCollections } from '../Storage/Storage';

const CollectionsScreen = ({ navigation }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCollections();
      setCollections(data);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>{JSON.stringify(collections)}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateCollection')}
          >
          <Text style={styles.buttonText}>Create a collection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CollectionsScreen;
