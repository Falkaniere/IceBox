import React from 'react';
import LoginScreen from '.';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useAuth } from '@/app/providers/AuthProvider';

jest.mock('@/app/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Google sign in when pressing continue button', () => {
    const signInWithGoogle = jest.fn();

    mockUseAuth.mockReturnValue({
      signInWithGoogle,
      signingIn: false,
      error: null,
      clearError: jest.fn(),
    });

    render(<LoginScreen />);

    fireEvent.press(screen.getByText('Continue with Google'));

    expect(signInWithGoogle).toHaveBeenCalledTimes(1);
  });

  it('should show and dismiss error state', () => {
    const clearError = jest.fn();

    mockUseAuth.mockReturnValue({
      signInWithGoogle: jest.fn(),
      signingIn: false,
      error: { message: 'Invalid credentials' },
      clearError,
    });

    render(<LoginScreen />);

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Invalid credentials')).toBeTruthy();

    fireEvent.press(screen.getByText('Dismiss'));

    expect(clearError).toHaveBeenCalledTimes(1);
  });
});
