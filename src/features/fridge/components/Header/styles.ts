import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E9F0FF',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  signOutButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  signOutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  signOutText: {
    color: '#E9F0FF',
    fontSize: 13,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});
