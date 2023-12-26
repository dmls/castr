import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { getCollections } from '../Storage/Storage';
import CardThumbnail from '../Components/CardThumbnail';

const CollectionsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, [navigation]);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCollections();
      setCollections(data);
    };

    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text>{JSON.stringify(collections)}</Text>
        </View>
      </View>

      {collections.map((c, index) => {
        return (
          <CardThumbnail key={index} onPress={() => navigation.navigate('CollectionView', {collection: c})} data={c} />
        );
      })}

      <View style={styles.sectionRow}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.push('CreateUpdate', {action: 'create'})}
        >
          <Text style={styles.buttonText}>Create a collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CollectionsScreen;
