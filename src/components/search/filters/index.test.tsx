import Filters from '.';
import { render } from '@testing-library/react-native';

const setup = () => {
  return render(<Filters />);
};

it('should render filters component correctly', () => {
  const { toJSON } = setup();
  expect(toJSON()).toMatchSnapshot();
});
