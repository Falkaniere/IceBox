import React from 'react';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';

import { useAuth } from '@/app/providers/AuthProvider';

import { styles } from './styles';
import { useFridgeItems } from '@/features/fridge/hooks/useFridgeItem';
import AddItemButton from '@/features/fridge/components/Header/components/addItemButton';

type HeaderProps = {
  onAddPress: () => void;
};

export default function Header({ onAddPress }: HeaderProps) {
  const { signOut, signingOut } = useAuth();
  const { addItem } = useFridgeItems();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Fridge</Text>

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
              <Text style={styles.signOutText}>Signing out...</Text>
            </View>
          ) : (
            <Text style={styles.signOutText}>Sign out</Text>
          )}
        </Pressable>

        <View style={styles.actions}>
          <AddItemButton onPress={onAddPress} />
        </View>
      </View>
    </View>
  );
}
