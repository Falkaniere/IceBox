import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { X } from 'lucide-react-native';
import { nanoid } from 'nanoid/non-secure';

import { useFridge } from '@/features/fridge/providers/FridgeProvider';
import { detectCategory } from '@/features/products/utils/detectCategory';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';
import { styles } from './styles';
import { FridgeItem as FridgeItemType } from '@/features/fridge/model/fridgeItem';

type Props = {
  onClose: () => void;
  item?: FridgeItemType;
};

export default function AddItemToFridge({ onClose, item }: Props) {
  const { t } = useAppTranslation('fridge');
  const { t: tCommon } = useAppTranslation('common');
  const { addItem, updateItem } = useFridge();

  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState(item?.name ?? '');
  const [qty, setQty] = useState(item ? String(item.qty) : '1');
  const [date, setDate] = useState<Date | null>(
    item ? new Date(item.expiresAt) : null,
  );

  function onChangeDate(_: any, selectedDate?: Date) {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  }

  function handleSave() {
    if (!name || !date) return;

    const payload = {
      name,
      qty: Number(qty),
      expiresAt: date.toISOString(),
      category: detectCategory(name),
    };

    if (item) {
      updateItem(item.id, payload);
    } else {
      addItem({
        id: nanoid(),
        ...payload,
        createdAt: new Date().toISOString(),
      });
    }

    onClose();
  }

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {item ? t('edit_item_title') : t('add_item_title')}
          </Text>
          <Pressable onPress={onClose} hitSlop={10}>
            <X size={20} color='#E9F0FF' />
          </Pressable>
        </View>

        <View style={styles.surface}>
          <Text style={styles.label}>{t('name_label')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('name_placeholder')}
            placeholderTextColor='#6F7E94'
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>{t('quantity_label')}</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={qty}
            onChangeText={setQty}
          />

          <Text style={styles.label}>{t('expiration_label')}</Text>

          <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
            <Text style={{ color: date ? '#E9F0FF' : '#6F7E94' }}>
              {date ? date.toISOString().split('T')[0] : t('select_date')}
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

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>{tCommon('save')}</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>{tCommon('cancel')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
