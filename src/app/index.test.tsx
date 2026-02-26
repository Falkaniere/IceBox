import React from 'react';
import AppIndex from './index';
import { render, screen } from '@testing-library/react-native';

jest.mock('@/app/navigation/RootNavigator', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return () => <Text>Root navigator</Text>;
});

jest.mock('@/app/providers/AuthProvider', () => {
  const React = require('react');
  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('@/features/fridge/providers/FridgeProvider', () => {
  const React = require('react');
  return {
    FridgeProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('AppIndex', () => {
  it('should render root navigator inside providers', () => {
    render(<AppIndex />);

    expect(screen.getByText('Root navigator')).toBeTruthy();
  });
});
