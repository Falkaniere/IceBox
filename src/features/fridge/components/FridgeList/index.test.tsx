import FridgeList from '.';
import { render } from '@testing-library/react-native';

const data = [
  { id: '1', name: 'red_apple', expires: 'Sep 5, 2024', qty: 4, icon: '🍎' },
  {
    id: '2',
    name: 'glass_of_milk',
    expires: 'Sep 7, 2025',
    qty: 2,
    icon: '🥛',
  },
  { id: '3', name: 'broccoli', expires: 'Sep 2, 2024', qty: 1, icon: '🥦' },
  {
    id: '4',
    name: 'cheese_wedge',
    expires: 'Aug 15, 2024',
    qty: 1,
    icon: '🧀',
    expired: true,
  },
];
const setup = () => {
  return render(<FridgeList data={data} />);
};

it('should render fridge list component correctly', () => {
  const { toJSON } = setup();

  expect(toJSON()).toMatchSnapshot();
});
