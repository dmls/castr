import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import DeleteCollectionButton from '../Components/DeleteCollectionButton';

const CollectionViewScreen = ({ navigation, route }) => {
  const {collection} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text>{JSON.stringify(collection)}</Text>
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.h1}>{collection.name}</Text>
        </View>

        {collection.image && (
          <View style={[styles.sectionRow, styles.sectionRowNoMargin]}>
            <Image source={{uri: collection.image}} style={styles.imageFullWidth} />
          </View>
        )}
      </View>

      {collection.characters?.length && 
        <View style={styles.section}>
          {collection.characters.map((c, index) => {
            return (
              <React.Fragment key={c}>
                <View style={styles.sectionRow}>
                  <View style={{flex: 2}}>
                    <Text style={styles.h2}>{c.name}</Text>
                  </View>

                  <View style={{flex: 1, height: 100}}>
                    <Image source={{uri: c.image}} style={[styles.imageFullWidth]} />
                  </View>
                </View>
              </React.Fragment>
            );
          })} 
        </View>
      }

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateUpdate', {action: 'create_char', collection: collection})}
          >
            <Text style={styles.buttonText}>Add character</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateUpdate', {action: 'edit', existingRecord: collection})}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.sectionRow}>
          <DeleteCollectionButton collection={collection} navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}

export default CollectionViewScreen;
