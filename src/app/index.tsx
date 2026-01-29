import React from 'react';
import RootNavigator from '@/app/navigation/RootNavigator';
import { AuthProvider } from '@/app/providers/AuthProvider';

function AppIndex() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default AppIndex;
