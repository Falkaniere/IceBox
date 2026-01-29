import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // no flex: 1 here, so it won't stretch inside Header
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#1D4ED8', // primary
    borderWidth: 1,
    borderColor: '#1E2A3A', // border (subtle)
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
