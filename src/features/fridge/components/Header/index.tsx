import { Text, View } from 'react-native';

import { styles } from './styles';
import AddItemToFridge from '@/features/fridge/components/AddItem/index';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Fridge</Text>
      <AddItemToFridge />
    </View>
  );
}

export default Header;
