import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logs } from 'expo';

import { styles } from '../assets/styles/Styles';
import { getCollection, createCollection, updateCollection, createCharacter, updateCharacter } from '../Storage/Storage';
import { navTitleCustom, navGetPrevScreen } from '../Utils/Navigation';
import Loader from '../Components/Loader';

Logs.enableExpoCliLogging()

const CreateUpdateScreen = ({ navigation, route }) => {
  const { action, editRecord, collection } = route?.params ?? {};

  const prevScreen = navGetPrevScreen();

  const actionConf = {
    create: {
      unit: 'collection',
      title: 'Create collection',
      onSubmit: useCallback(async (args) => await createCollection(args.data)),
    },
    edit: {
      unit: 'collection',
      title: 'Edit collection',
      onSubmit: useCallback(async (args) => await updateCollection(args.editRecord, args.data)),
    },
    create_char: {
      unit: 'character',
      title: 'Create character',
      onSubmit: useCallback(async (args) => await createCharacter(args.data, args.collection)),
    },
    update_char: {
      unit: 'character',
      title: 'Edit character',
      onSubmit: useCallback(async (args) => await updateCharacter(args.editRecord, args.collection, args.data)),
    },
  }[action];
  
  navTitleCustom(String(actionConf.title));

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(editRecord?.image || null);

  const validationSchema = yup.object().shape({
    name: yup.string()
    .max(50, 'Name must be at most fifty characters long.')
    .required('Please enter a name for the new collection.'),
  });

  const formik = useFormik({
    initialValues: {
      name: editRecord?.name || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
    
      const data = {name: values.name, image: image};
      const args = {
        create: {data: data},
        edit: {editRecord: editRecord, data: data},
        create_char: {collection: collection, data: data},
        update_char: {editRecord: editRecord, collection: collection, data: data},
      }[action];
      
      const result = await actionConf.onSubmit(args);

      setLoading(false);

      navigation.navigate('CollectionView', {collection: collection ? await getCollection(collection.id) : result});
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <View style={styles.container}>
      <Loader loading={loading} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>

          <View style={styles.section}>
            <View style={[styles.sectionRow, styles.jcFlexStart]}>
              <Text style={styles.inputLabel}>{actionConf.unit.charAt(0).toUpperCase() + actionConf.unit.slice(1)} name</Text>
            </View>
            <View style={styles.sectionRow}>
              <TextInput
                style={[styles.input, (errors.name && styles.inputError)]}
                onChangeText={handleChange('name')}
                value={values.name}
              />
            </View>

            {touched.name && errors.name && (
              <View style={[styles.sectionRow, styles.jcFlexStart]}>
                <Text style={styles.errorText}>{errors.name}</Text>
              </View>
            )}

            {image &&
              <View style={styles.sectionRow}>
                <Image source={{ uri: image }} style={styles.imageFullWidth} />
              </View>
            }

            <View style={styles.sectionRow}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={pickImage}
              >
                <Text style={styles.buttonText}>Select image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionRow}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default CreateUpdateScreen;
