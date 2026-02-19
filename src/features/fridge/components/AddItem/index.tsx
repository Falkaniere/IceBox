import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';
import { FridgeItem } from '@/features/fridge/model/fridgeItem';
import { detectCategory } from '@/features/products/utils/detectCategory';
import { v4 as uuidv4 } from 'uuid';

type AddItemToFridgeProps = {
  onSave: (item: FridgeItem) => void;
};

export default function AddItemToFridge({ onSave }: AddItemToFridgeProps) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');
  const [expiresAt, setExpiresAt] = useState('');

  function handleSave() {
    if (!name || !expiresAt) return;

    const category = detectCategory(name);

    const newItem: FridgeItem = {
      id: uuidv4(),
      name,
      qty: Number(qty),
      expiresAt: new Date(expiresAt).toISOString(),
      category,
      createdAt: new Date().toISOString(),
    };

    onSave(newItem);
  }

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Quantity</Text>
      <TextInput value={qty} onChangeText={setQty} keyboardType='numeric' />

      <Text>Expiration Date (YYYY-MM-DD)</Text>
      <TextInput value={expiresAt} onChangeText={setExpiresAt} />

      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
