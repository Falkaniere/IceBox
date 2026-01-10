import { Text, View } from 'react-native';

import { styles } from './styles';
import AddItemToFridge from '../addItemToFridge';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Fridge</Text>
      <AddItemToFridge />
    </View>
  );
}

export default Header;
