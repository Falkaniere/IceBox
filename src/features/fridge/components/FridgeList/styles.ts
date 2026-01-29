import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  contentContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
  },

  separator: {
    height: 10,
  },

  emptyContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  emptyTitle: {
    color: '#E9F0FF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },

  emptySubtitle: {
    color: '#A9B6C9',
    fontSize: 13,
    lineHeight: 18,
  },
});
