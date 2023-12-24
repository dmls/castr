import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, colors } from '../assets/styles/Styles';
import DeleteCollectionButton from '../Components/DeleteCollectionButton';
import { deleteCharacter } from '../Storage/Storage';

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

      {collection.characters?.length > 0 && 
          collection.characters.map((c, index) => {
            return (
              <View key={index} style={styles.section}>
                <View style={styles.sectionRow}>
                  <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={styles.h2}>{c.name}</Text>
                    </View>

                    <View>
                      <TouchableOpacity onPress={async () => {
                        const result = await deleteCharacter(collection, c);
                        navigation.navigate('CollectionView', {collection: result});
                      }}
                      >
                        <Text style={{color: colors.danger}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{flex: 1, height: 100}}>
                    <Image source={{uri: c.image}} style={[styles.imageFullWidth]} />
                  </View>
                </View>
              </View>
            );
          }) 
      }

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateUpdate', {action: 'create_char', collection: collection, existingRecord: {}})}
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
