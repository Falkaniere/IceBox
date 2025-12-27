import { Text, View } from 'react-native';

import { styles } from './styles';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Fridge</Text>
    </View>
  );
}

export default Header;
