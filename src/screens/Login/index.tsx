import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useAuth } from '@/app/providers/AuthProvider';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { signInWithGoogle, signingIn, error, clearError } = useAuth();

  const handleGoogleSignIn = async () => {
    if (signingIn) return;
    await signInWithGoogle();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>IceBox</Text>
        </View>

        <Text style={styles.title}>Keep your fridge under control</Text>
        <Text style={styles.subtitle}>
          Scan products, set expiration dates, and get alerts before food goes
          bad.
        </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorMessage}>{error.message}</Text>

            <Pressable onPress={clearError} style={styles.errorDismiss}>
              <Text style={styles.errorDismissText}>Dismiss</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole='button'
          onPress={signInWithGoogle}
          disabled={signingIn}
          style={({ pressed }) => [
            styles.googleButton,
            signingIn && styles.buttonDisabled,
            pressed && !signingIn && styles.buttonPressed,
          ]}
        >
          {signingIn ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator />
              <Text style={styles.buttonText}>Signing in...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Continue with Google</Text>
          )}
        </Pressable>

        <Text style={styles.legalText}>
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
