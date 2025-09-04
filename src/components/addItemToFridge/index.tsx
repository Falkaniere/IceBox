import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

function AddItemToFridge() {
  return (
    <TouchableOpacity style={styles.fab}>
      <Text>+</Text>
    </TouchableOpacity>
  );
}

export default AddItemToFridge;
