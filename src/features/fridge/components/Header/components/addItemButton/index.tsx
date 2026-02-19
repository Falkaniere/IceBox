import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';

export default function AddItemButton() {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole='button'
        accessibilityLabel='Add item'
        onPress={() => {}}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        hitSlop={10}
      >
        <FontAwesome6 name='plus' iconStyle='solid' size={18} color='#FFFFFF' />
      </Pressable>
    </View>
  );
}
