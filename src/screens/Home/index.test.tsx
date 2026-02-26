import React from 'react';
import HomeScreen from '.';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useFridge } from '@/features/fridge/providers/FridgeProvider';

jest.mock('@/features/fridge/providers/FridgeProvider', () => ({
  useFridge: jest.fn(),
}));

jest.mock('@/features/fridge/components/Header', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');

  return ({ onAddPress }: { onAddPress: () => void }) => (
    <Pressable onPress={onAddPress} accessibilityRole='button'>
      <Text>Open add modal</Text>
    </Pressable>
  );
});

jest.mock('@/features/fridge/components/Search', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return () => <Text>Search component</Text>;
});

jest.mock('@/features/fridge/components/FridgeList', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ data }: { data: Array<{ name: string }> }) => (
    <Text>{`Items: ${data.length}`}</Text>
  );
});

jest.mock('@/features/fridge/components/AddItem', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');

  return ({ onClose }: { onClose: () => void }) => (
    <Pressable onPress={onClose} accessibilityRole='button'>
      <Text>Add item form</Text>
    </Pressable>
  );
});

const mockUseFridge = useFridge as jest.Mock;

describe('HomeScreen', () => {
  it('should open add item modal when pressing header action', () => {
    mockUseFridge.mockReturnValue({
      items: [
        {
          id: '1',
          name: 'Milk',
          qty: 1,
          expiresAt: '2026-01-01T00:00:00.000Z',
          category: 'dairy',
          createdAt: '2025-01-01T00:00:00.000Z',
        },
      ],
    });

    render(<HomeScreen />);

    expect(screen.getByText('Items: 1')).toBeTruthy();

    fireEvent.press(screen.getByText('Open add modal'));

    expect(screen.getByText('Add item form')).toBeTruthy();
  });
});
