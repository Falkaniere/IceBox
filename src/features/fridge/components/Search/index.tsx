import React, { useMemo } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import Filters, { FridgeFilter } from './filters';
import { styles } from './styles';

type SearchProps = {
  query: string;
  onChangeQuery: (value: string) => void;
  filter: FridgeFilter;
  onChangeFilter: (value: FridgeFilter) => void;
};

export default function Search({
  query,
  onChangeQuery,
  filter,
  onChangeFilter,
}: SearchProps) {
  const showClear = useMemo(() => query.trim().length > 0, [query]);

  const handleClear = () => onChangeQuery('');

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.iconContainer}>
          <FontAwesome6
            name='magnifying-glass'
            iconStyle='solid'
            size={16}
            color='#A9B6C9'
          />
        </View>

        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          style={styles.input}
          placeholder='Search items...'
          placeholderTextColor='#6F7E94'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='search'
          clearButtonMode='never'
        />

        {showClear ? (
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Clear search'
            onPress={handleClear}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.clearButtonPressed,
            ]}
            hitSlop={10}
          >
            <FontAwesome6
              name='x'
              iconStyle='solid'
              size={14}
              color='#E9F0FF'
            />
          </Pressable>
        ) : null}
      </View>

      <Filters value={filter} onChange={onChangeFilter} />
    </View>
  );
}
