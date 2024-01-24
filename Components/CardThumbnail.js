import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';
import { print } from '../Utils/Debug';

const CardThumbnail = ({ index, onPress, data, actions }) => {
  return (
    <TouchableOpacity key={index} onPress={onPress} style={styles.section}>
      <View style={styles.sectionRow}>
        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.h2}>{data.name}</Text>
          </View>

          {actions}
        </View>

        <View style={{flex: 1, height: 100}}>
          <Image source={{uri: data.image}} style={[styles.imageFullWidth]} />
        </View>
      </View>
      
      {print(data)}
    </TouchableOpacity>  
  );
}

export default CardThumbnail;
