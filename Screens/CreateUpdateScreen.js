import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import { styles } from '../assets/styles/Styles';
import db from '../Storage/SQLite';
import { navTitleCustom } from '../Utils/Navigation';
import Loader from '../Components/Loader';

const CreateUpdateScreen = ({ navigation, route }) => {
  const { action, editRecord, collection } = route?.params ?? {};
  
  const actionConf = {
    add_collection: {
      unit: 'collection',
      title: 'Create collection',
      onSubmit: useCallback(async (args) => await db.add('collections', args.data)),
    },
    update_collection: {
      unit: 'collection',
      title: 'Edit collection',
      onSubmit: useCallback(async (args) => await db.update('collections', args.editRecord.id, args.data)),
    },
    add_member: {
      unit: 'member',
      title: 'Create member',
      onSubmit: useCallback(async (args) => await db.add('members', {...args.data, ...{collection_id: args.collection.id}})),
    },
    update_member: {
      unit: 'member',
      title: 'Edit member',
      onSubmit: useCallback(async (args) => await db.update('members', args.editRecord.id, args.data)),
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
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
    
      const data = {name: values.name, image: image};
      const args = {
        add_collection: {data: data},
        update_collection: {editRecord: editRecord, data: data},
        add_member: {collection: collection, data: data},
        update_member: {editRecord: editRecord, collection: collection, data: data},
      }[action];
      
      const result = await actionConf.onSubmit(args);

      setLoading(false);
      
      resetForm();
      formik.setValues({ name: '' });
      setImage(null);

      navigation.navigate('CollectionView', {collection: collection ? await db.getById('collections', collection.id) : result});
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
                style={[styles.input, (errors.name && styles.inputError && formik.submitCount > 0)]}
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
