import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, colors } from '../assets/styles/Styles';
import DeleteCollectionButton from '../Components/DeleteCollectionButton';
import CardThumbnail from '../Components/CardThumbnail';
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
            const actions = (
              <View>
                <TouchableOpacity onPress={async () => {
                  const result = await deleteCharacter(collection, c);
                  navigation.navigate('CollectionView', {collection: result});
                }}
                >
                  <Text style={{color: colors.danger}}>Delete</Text>
                </TouchableOpacity>
              </View>
            );

            return (
              <CardThumbnail 
                key={index} 
                onPress={() => navigation.navigate('CreateUpdate', {action: 'update_char', collection: collection, editRecord: c})} 
                data={c} 
                actions={actions} 
              />
            );
          })
      }

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateUpdate', {action: 'create_char', collection: collection, editRecord: {}})}
          >
            <Text style={styles.buttonText}>Add character</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('CreateUpdate', {action: 'edit', editRecord: collection})}
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
