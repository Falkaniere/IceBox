import FridgeItem from '.';
import { render } from '@testing-library/react-native';

const Item = {
  id: '2',
  name: 'glass_of_milk',
  expires: 'Sep 7, 2025',
  qty: 2,
  icon: '🥛',
};

const setup = () => {
  return render(<FridgeItem item={Item} />);
};

it('should render fridge item component correctly', () => {
  const { toJSON } = setup();

  expect(toJSON()).toMatchSnapshot();
});
