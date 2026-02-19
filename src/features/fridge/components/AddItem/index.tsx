import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { X } from 'lucide-react-native';
import { nanoid } from 'nanoid/non-secure';

import { useFridge } from '@/features/fridge/providers/FridgeProvider';
import { detectCategory } from '@/features/products/utils/detectCategory';
import { styles } from './styles';

type Props = {
  onClose: () => void;
};

export default function AddItemToFridge({ onClose }: Props) {
  const { addItem } = useFridge();

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');

  function onChangeDate(event: any, selectedDate?: Date) {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  function handleSave() {
    if (!name || !date) return;

    addItem({
      id: nanoid(),
      name,
      qty: Number(qty),
      expiresAt: date.toISOString(),
      category: detectCategory(name),
      createdAt: new Date().toISOString(),
    });

    onClose();
  }

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Item</Text>
          <Pressable onPress={onClose} hitSlop={10}>
            <X size={20} color='#E9F0FF' />
          </Pressable>
        </View>

        {/* Surface Card */}
        <View style={styles.surface}>
          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder='e.g. Milk'
            placeholderTextColor='#6F7E94'
            value={name}
            onChangeText={setName}
          />

          {/* Quantity */}
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={qty}
            onChangeText={setQty}
          />

          {/* Expiration */}
          <Text style={styles.label}>Expiration Date</Text>

          <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
            <Text
              style={{
                color: date ? '#E9F0FF' : '#6F7E94',
              }}
            >
              {date ? date.toISOString().split('T')[0] : 'Select date'}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode='date'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSave}
          >
            <Text style={styles.primaryButtonText}>Save</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
