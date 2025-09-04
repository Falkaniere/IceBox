import { Text, View } from 'react-native';
import Emoji from 'react-native-emoji';

import { styles } from './styles';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Fridge</Text>
      <View style={styles.headerIcons}>
        <Emoji name='add' />
        <Emoji name='options' />
      </View>
    </View>
  );
}

export default Header;
