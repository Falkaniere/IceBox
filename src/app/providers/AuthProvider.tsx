import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Platform } from 'react-native';

const GOOGLE_WEB_CLIENT_ID =
  '1056602283808-f4ni995b7bsrma1akor39m4fpq1esc52.apps.googleusercontent.com';

type AuthError = {
  code?: string;
  message: string;
};

type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  signingIn: boolean;
  signingOut: boolean;
  error: AuthError | null;
  clearError: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeAuthError(err: any): AuthError {
  const code = err?.code ?? err?.name;
  const rawMessage = err?.message ?? 'Unknown error';

  // Keep messages user-friendly
  if (code === statusCodes.SIGN_IN_CANCELLED) {
    return { code, message: 'Sign-in was cancelled.' };
  }
  if (code === statusCodes.IN_PROGRESS) {
    return { code, message: 'Sign-in is already in progress.' };
  }
  if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return {
      code,
      message: 'Google Play Services is not available or outdated.',
    };
  }

  return { code, message: rawMessage };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(u => {
      setUser(u);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    setSigningIn(true);

    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const signInResult = await GoogleSignin.signIn();
      const idToken =
        signInResult.data?.idToken ?? (signInResult as any).idToken;

      if (!idToken) throw new Error('No Google ID token returned');

      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (e: any) {
      const normalized = normalizeAuthError(e);

      if (normalized.code === statusCodes.SIGN_IN_CANCELLED) return;

      setError(normalized);
    } finally {
      setSigningIn(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setSigningOut(true);

    try {
      await auth().signOut();

      try {
        await GoogleSignin.signOut();
      } catch (error) {
        console.log('Failed to sign out from GoogleSignin', error);
      }
    } catch (error) {
      setError(normalizeAuthError(error));
    } finally {
      setSigningOut(false);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      initializing,
      signingIn,
      signingOut,
      error,
      clearError,
      signInWithGoogle,
      signOut,
    }),
    [user, initializing, signingIn, signingOut, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
