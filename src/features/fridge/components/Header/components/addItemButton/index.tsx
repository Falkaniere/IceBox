import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { Plus } from 'lucide-react-native';

type Props = {
  onPress: () => void;
};

export default function AddItemButton({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole='button'
        accessibilityLabel='Add item'
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        hitSlop={10}
      >
        <Plus size={18} color='#FFFFFF' />
      </Pressable>
    </View>
  );
}
