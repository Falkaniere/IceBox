import Search from '.';
import { render } from '@testing-library/react-native';

const setup = () => {
  return render(<Search />);
};

it('should render search component correctly', () => {
  const { toJSON } = setup();
  expect(toJSON()).toMatchSnapshot();
});
