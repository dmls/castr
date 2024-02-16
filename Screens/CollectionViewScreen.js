import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, colors } from '../assets/styles/Styles';
import DeleteButton from '../Components/DeleteButton';
import { deleteCharacters } from '../Storage/Storage';
import db from '../Storage/SQLite';
import CardThumbnail from '../Components/CardThumbnail';
import { navSetBackButton } from '../Utils/Navigation';
import { print } from '../Utils/Debug';

const CollectionViewScreen = ({ navigation, route }) => {
  const {collection} = route.params;

  navSetBackButton('Collections');

  const [members, setMembers] = useState([]);

  const loadData = async () => {
    const data = await db.getMembers(collection.id);
    setMembers(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {print(collection)}

        <View style={styles.sectionRow}>
          <Text style={styles.h1}>{collection.name}</Text>
        </View>

        {collection.image && (
          <View style={[styles.sectionRow, styles.sectionRowNoMargin]}>
            <Image source={{uri: collection.image}} style={styles.imageFullWidth} />
          </View>
        )}
      </View>

      {members?.length > 0 && 
          members.map((c, index) => {
            const actions = (
              <View>
                <DeleteButton 
                  callback={() => deleteCharacters(collection, c)}
                  label={c.name}
                  navigate={{screen: 'CollectionView', args: {collection: collection}}}
                  textOnly={true}
                />
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
          <DeleteButton 
            callback={() => db.deleteCollection(collection.id)}
            label={'this collection'}
            navigate={{screen: 'Collections', args: {collection: collection}}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default CollectionViewScreen;
