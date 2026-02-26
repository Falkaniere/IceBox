import React from 'react';
import AddItemButton from '.';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('AddItemButton', () => {
  it('should call onPress when tapping add button', () => {
    const onPress = jest.fn();

    render(<AddItemButton onPress={onPress} />);

    fireEvent.press(screen.getByLabelText('Add item'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
