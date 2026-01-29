import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },

  pill: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  pillSelected: {
    backgroundColor: '#1D4ED8',
    borderColor: '#1D4ED8',
  },

  pillPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  text: {
    color: '#A9B6C9',
    fontSize: 13,
    fontWeight: '700',
  },

  textSelected: {
    color: '#FFFFFF',
  },
});
