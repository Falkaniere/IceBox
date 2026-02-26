import React from 'react';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';

import { useAuth } from '@/app/providers/AuthProvider';

import { styles } from './styles';
import { useFridgeItems } from '@/features/fridge/hooks/useFridgeItem';
import AddItemButton from '@/features/fridge/components/Header/components/addItemButton';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';

type HeaderProps = {
  onAddPress: () => void;
};

export default function Header({ onAddPress }: HeaderProps) {
  const { t } = useAppTranslation('fridge');
  const { t: tCommon } = useAppTranslation('common');
  const { signOut, signingOut } = useAuth();
  const { addItem } = useFridgeItems();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{t('title')}</Text>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole='button'
          onPress={signOut}
          disabled={signingOut}
          style={({ pressed }) => [
            styles.signOutButton,
            signingOut && styles.buttonDisabled,
            pressed && !signingOut && styles.buttonPressed,
          ]}
        >
          {signingOut ? (
            <View style={styles.signOutContent}>
              <ActivityIndicator />
              <Text style={styles.signOutText}>{tCommon('signing_out')}</Text>
            </View>
          ) : (
            <Text style={styles.signOutText}>{tCommon('sign_out')}</Text>
          )}
        </Pressable>

        <View style={styles.actions}>
          <AddItemButton onPress={onAddPress} />
        </View>
      </View>
    </View>
  );
}
