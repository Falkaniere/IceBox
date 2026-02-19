import React from 'react';
import RootNavigator from '@/app/navigation/RootNavigator';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { FridgeProvider } from '@/features/fridge/providers/FridgeProvider';

function AppIndex() {
  return (
    <AuthProvider>
      <FridgeProvider>
        <RootNavigator />
      </FridgeProvider>
    </AuthProvider>
  );
}

export default AppIndex;
