import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
function AddItemToFridge() {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => console.log('Button pressed!')}
      >
        <FontAwesome6 name='plus' iconStyle='solid' size={32} color='#000000' />
      </TouchableOpacity>
    </View>
  );
}

export default AddItemToFridge;
