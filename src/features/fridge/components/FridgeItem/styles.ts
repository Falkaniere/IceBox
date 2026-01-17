import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});
