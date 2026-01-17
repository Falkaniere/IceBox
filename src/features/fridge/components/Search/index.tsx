import { TextInput } from 'react-native';

import { styles } from './styles';
import Filters from './filters';

function Search() {
  return (
    <>
      <TextInput
        style={styles.search}
        placeholder='Search items...'
        placeholderTextColor='#aaa'
      />

      <Filters />
    </>
  );
}

export default Search;
