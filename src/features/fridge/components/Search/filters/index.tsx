import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

export type FridgeFilter = 'all' | 'soon' | 'expired';

type FiltersProps = {
  value: FridgeFilter;
  onChange: (value: FridgeFilter) => void;
};

const filterOptions: Array<{ value: FridgeFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'soon', label: 'Soon' },
  { value: 'expired', label: 'Expired' },
];

export default function Filters({ value, onChange }: FiltersProps) {
  return (
    <View style={styles.container}>
      {filterOptions.map(option => {
        const selected = value === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole='button'
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.pill,
              selected && styles.pillSelected,
              pressed && styles.pillPressed,
            ]}
          >
            <Text style={[styles.text, selected && styles.textSelected]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
