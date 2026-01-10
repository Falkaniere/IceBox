import AddItemToFridge from '.';
import { render } from '@testing-library/react-native';

const setup = () => {
  return render(<AddItemToFridge />);
};

it('should render add item to fridge component correctly', () => {
  const { toJSON } = setup();

  expect(toJSON()).toMatchSnapshot();
});
