import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
    padding: 12,
    borderRadius: 16,
  },

  itemIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E9F0FF', // text primary
  },

  itemDate: {
    fontSize: 13,
    color: '#A9B6C9', // text secondary
  },

  itemDateSoon: {
    color: '#E9F0FF',
  },

  itemDateExpired: {
    color: '#E9F0FF',
  },

  // rigthIcons: {
  //   // flex: 1,
  //   paddingHorizontal: 8,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },

  qtyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#0B0F14',
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  qtyText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E9F0FF',
  },

  deleteButtonAbsolute: {
    marginLeft: 12,
    opacity: 0.7,
  },
});
