import React, { useState, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import db from '../Storage/SQLite';
import CardThumbnail from '../Components/CardThumbnail';

const CollectionsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, [navigation]);

  const [collections, setCollections] = useState([]);

  const loadData = async () => {
    const data = await db.getTable('collections');
    setCollections(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {collections.map((c, index) => {
        return (
          <CardThumbnail 
            key={index} 
            onPress={() => navigation.navigate('CollectionView', {collection: c})} 
            data={c} 
            fullWidth={true}
          />
        );
      })}

      <View style={styles.sectionRow}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.push('CreateUpdate', {action: 'add_collection'})}
        >
          <Text style={styles.buttonText}>Create a collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CollectionsScreen;
