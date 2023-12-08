import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../assets/styles/Styles';
import DeleteCollectionButton from '../Components/DeleteCollectionButton';

const CollectionViewScreen = ({ navigation, route }) => {
  const {collection} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.foo}>{collection.name}</Text>
        </View>

        {collection.image && (
          <View style={styles.sectionRow}>
            <Image source={{ uri: collection.image }} style={{ width: 200, height: 200 }} />
          </View>
        )}

        <View style={styles.sectionRow}>
          <DeleteCollectionButton collection={collection} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

export default CollectionViewScreen;
