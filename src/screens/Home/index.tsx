import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

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

        {/* Search */}

        <TextInput
          style={styles.search}
          placeholder='Search items...'
          placeholderTextColor='#aaa'
        />

        {/* Filter buttons (simplified) */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Soon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Expired</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, item.expired && styles.expiredCard]}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text
                  style={[styles.itemDate, item.expired && styles.expiredText]}
                >
                  {item.expired
                    ? `Expired: ${item.expires}`
                    : `Expires: ${item.expires}`}
                </Text>
              </View>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>x{item.qty}</Text>
              </View>
            </View>
          )}
        />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <Emoji name='plus' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 16 },

  icon: { marginRight: 16 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 16,
  },
  filters: { flexDirection: 'row', marginBottom: 12 },
  filterBtn: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  filterText: { color: '#333', fontWeight: '500' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  expiredCard: { backgroundColor: '#FFF2F2' },
  itemIcon: { fontSize: 28, marginRight: 12 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemDate: { fontSize: 13, color: '#666' },
  expiredText: { color: 'red', fontWeight: '500' },
  qtyBadge: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: { fontWeight: '600', color: '#333' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2BBBAD',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
