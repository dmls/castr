import React, { useCallback, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm } from 'react-hook-form';

import { styles } from '../assets/styles/Styles.js';
// import { KeyboardAvoidingView } from 'react-native-web';

const CreateCollectionScreen = ({ navigation }) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    console.log(formData);
  }, []);

  const onChangeField = useCallback(
    name => val => {
      setValue(name, val);
    },
    []
  );

   useEffect(() => {
     register('name');
   }, [register]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.section}>
            <Text style={styles.inputLabel}>Collection name</Text>
          </View>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeField('name')}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default CreateCollectionScreen;
