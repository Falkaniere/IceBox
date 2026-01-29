import React from 'react';
import { Pressable, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';

type AddItemToFridgeProps = {
  onPress?: () => void;
};

export default function AddItemToFridge({ onPress }: AddItemToFridgeProps) {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole='button'
        accessibilityLabel='Add item'
        onPress={handlePress}
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
