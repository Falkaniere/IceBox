import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 15, 20, 0.6)', // overlayScrim
    paddingHorizontal: 5,
    paddingTop: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#0B0F14', // background
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#E9F0FF', // textPrimary
  },

  surface: {
    backgroundColor: '#121A24', // surface
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E2A3A', // border
    gap: 12,
  },

  label: {
    fontSize: 14,
    color: '#A9B6C9', // textSecondary
    marginTop: 10,
  },

  input: {
    backgroundColor: '#0B0F14',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1E2A3A',
    color: '#E9F0FF',
  },

  actions: {
    marginTop: 24,
    gap: 16,
  },

  primaryButton: {
    backgroundColor: '#1D4ED8', // primary
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },

  cancelText: {
    textAlign: 'center',
    color: '#A9B6C9',
    fontSize: 14,
  },

  buttonPressed: {
    opacity: 0.85,
  },
});
