import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121A24', // surface
    borderWidth: 1,
    borderColor: '#1E2A3A', // border
    padding: 12,
    borderRadius: 16,
  },

  itemIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  content: {
    flex: 1,
    gap: 6,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  itemName: {
    flex: 1,
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

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#0B0F14', // background
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  statusPillSoon: {
    // subtle "warning" using primary + opacity-like feel (still within palette)
    backgroundColor: '#121A24',
    borderColor: '#1D4ED8',
  },

  statusPillExpired: {
    backgroundColor: '#121A24',
    borderColor: '#6F7E94',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A9B6C9',
  },

  statusTextSoon: {
    color: '#E9F0FF',
  },

  statusTextExpired: {
    color: '#E9F0FF',
  },

  qtyBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
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
});
