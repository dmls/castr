import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
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
        <View style={styles.sectionRow}>
          <Text>{JSON.stringify(collections)}</Text>
        </View>
      </View>

      {collections.map((c, index) => {
        return (
          <TouchableOpacity key={index} style={styles.section} onPress={() => navigation.navigate('CollectionView')}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionText}>{c.name}</Text>
            </View>
          </TouchableOpacity>
        )
      })}

      <View style={styles.sectionRow}>
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
