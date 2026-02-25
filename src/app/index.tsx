import React from 'react';
import RootNavigator from '@/app/navigation/RootNavigator';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { FridgeProvider } from '@/features/fridge/providers/FridgeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function AppIndex() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <FridgeProvider>
          <RootNavigator />
        </FridgeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default AppIndex;
