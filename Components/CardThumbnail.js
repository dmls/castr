import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/Styles';

const CardThumbnail = ({ index, onPress, data, actions, fullWidth = false }) => {
  const CardTitle = (
    <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.h2}>{data.name}</Text>
      </View>

      {!fullWidth && (<View>{actions}</View>)}
    </View>
  );

  const CardImage = data.image ? (
    <View style={{ flex: 1, ...(fullWidth ? {} : { height: 100 }) }}>
      <Image source={{uri: data.image}} style={[styles.imageFullWidth]} />
    </View>
  ) : (<></>);
  
  return (
    <TouchableOpacity key={index} onPress={onPress} style={styles.section}>

      {fullWidth && (
        <>
          <View style={styles.sectionRow}>
            {CardTitle}
          </View>

          {CardImage}
        </>
      )}

      {!fullWidth && (
        <View style={styles.sectionRow}>
          {CardTitle}
          {CardImage}
        </View>
      )}
    </TouchableOpacity>  
  );
}

export default CardThumbnail;
