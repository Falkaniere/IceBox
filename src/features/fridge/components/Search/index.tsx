import React, { useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import Filters from './filters';
import { styles } from './styles';

export default function Search() {
  const [query, setQuery] = useState('');

  const showClear = useMemo(() => query.trim().length > 0, [query]);

  const handleClear = () => setQuery('');

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
          onChangeText={setQuery}
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
              name='xmark'
              iconStyle='solid'
              size={14}
              color='#E9F0FF'
            />
          </Pressable>
        ) : null}
      </View>

      <Filters />
    </View>
  );
}
