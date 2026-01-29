import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 10,
    gap: 12,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 16,
    backgroundColor: '#121A24', // surface
    borderWidth: 1,
    borderColor: '#1E2A3A', // border
    paddingHorizontal: 10,
  },

  iconContainer: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#E9F0FF', // text primary
    fontSize: 14,
    paddingVertical: 0,
  },

  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0F14', // background
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  clearButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
