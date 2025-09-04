import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View, StyleSheet } from 'react-native';
import Header from '../../components/header';
import Search from '../../components/search';
import FridgeList from '../../components/fridgeList';
import AddItemToFridge from '../../components/addItemToFridge';
import { styles } from './styles';

function Home() {
  const data = [
    { id: '1', name: 'red_apple', expires: 'Sep 5, 2024', qty: 4, icon: '🍎' },
    {
      id: '2',
      name: 'glass_of_milk',
      expires: 'Sep 7, 2025',
      qty: 2,
      icon: '🥛',
    },
    { id: '3', name: 'broccoli', expires: 'Sep 2, 2024', qty: 1, icon: '🥦' },
    {
      id: '4',
      name: 'cheese_wedge',
      expires: 'Aug 15, 2024',
      qty: 1,
      icon: '🧀',
      expired: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <Search />
        <FridgeList data={data} />
        <AddItemToFridge />
      </View>
    </SafeAreaView>
  );
}

export default Home;
