import Header from '.';
import { render, screen, userEvent } from '@testing-library/react-native';

const setup = () => {
  return render(<Header />);
};

it('should render header component correctly', () => {
  const { toJSON } = setup();
  expect(toJSON()).toMatchSnapshot();
});
