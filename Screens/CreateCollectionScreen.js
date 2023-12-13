import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logs } from 'expo';

import { styles } from '../assets/styles/Styles';
import { createCollection, updateCollection } from '../Storage/Storage';
import Loader from '../Components/Loader';

Logs.enableExpoCliLogging()

const CreateCollectionScreen = ({ navigation, route }) => {
  const { collection } = route?.params ?? {};

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(collection?.image || null);

  const validationSchema = yup.object().shape({
    name: yup.string()
    .max(50, 'Name must be at most fifty characters long.')
    .required('Please enter a name for the new collection.'),
  });

  const formik = useFormik({
    initialValues: {
      name: collection?.name || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const data = {name: values.name, image: image};
      const result = collection ? await updateCollection(collection, data) : await createCollection(data);
      
      setLoading(false);
      navigation.push('CollectionView', {collection: result});
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
              <Text style={styles.inputLabel}>Collection name</Text>
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
                <Text style={styles.buttonText}>{collection ? 'Update' : 'Create'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default CreateCollectionScreen;
