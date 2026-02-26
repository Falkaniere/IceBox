import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useAuth } from '@/app/providers/AuthProvider';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';

export default function LoginScreen() {
  const { t } = useAppTranslation('auth');
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

        <Text style={styles.title}>{t('hero_title')}</Text>
        <Text style={styles.subtitle}>{t('hero_subtitle')}</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>{t('error_title')}</Text>
            <Text style={styles.errorMessage}>{error.message}</Text>

            <Pressable onPress={clearError} style={styles.errorDismiss}>
              <Text style={styles.errorDismissText}>{t('dismiss')}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole='button'
          onPress={handleGoogleSignIn}
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
              <Text style={styles.buttonText}>{t('signing_in')}</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>{t('continue_google')}</Text>
          )}
        </Pressable>

        <Text style={styles.legalText}>{t('legal_text')}</Text>
      </View>
    </SafeAreaView>
  );
}
