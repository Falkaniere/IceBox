import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
    backgroundColor: '#0B0F14',
  },

  hero: {
    marginTop: 32,
  },

  logoPlaceholder: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
    marginBottom: 18,
  },

  logoText: {
    color: '#E9F0FF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  title: {
    color: '#E9F0FF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },

  subtitle: {
    color: '#A9B6C9',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 340,
  },

  errorBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#121A24',
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  errorTitle: {
    color: '#E9F0FF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  errorMessage: {
    color: '#A9B6C9',
    fontSize: 13,
    lineHeight: 18,
  },

  errorDismiss: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1E2A3A',
  },

  errorDismissText: {
    color: '#E9F0FF',
    fontSize: 12,
    fontWeight: '700',
  },

  actions: {
    gap: 12,
  },

  googleButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  legalText: {
    color: '#6F7E94',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
