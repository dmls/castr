import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logs } from 'expo';

import { styles } from '../assets/styles/Styles';
import Loader from '../Components/Loader';

Logs.enableExpoCliLogging()

const CreateCollectionScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const saveToStorage = async (values) => {
    try {
      const collectionsString = await AsyncStorage.getItem('collections');
      const collectionsArray = collectionsString ? JSON.parse(collectionsString) : [];

      collectionsArray.push({ created: Date.now(), name: values.name });

      await AsyncStorage.setItem('collections', JSON.stringify(collectionsArray));
    } catch (error) {
      console.error('Error saving name to AsyncStorage:', error);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string()
      .max(50, 'Name must be at most fifty characters long.')
      .required('Please enter a name for the new collection.'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await saveToStorage(values);
      setLoading(false);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <View style={styles.container}>
      <Loader loading={loading} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <View style={[styles.section, styles.jcFlexStart]}>
            <Text style={styles.inputLabel}>Collection name</Text>
          </View>
          <View style={styles.section}>
            <TextInput
              style={[styles.input, (errors.name && styles.inputError)]}
              onChangeText={handleChange('name')}
              value={values.name}
            />
          </View>

            {touched.name && errors.name && (
              <View style={[styles.section, styles.jcFlexStart]}>
                <Text style={styles.errorText}>{errors.name}</Text>
              </View>
            )}

          <View style={styles.section}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default CreateCollectionScreen;
