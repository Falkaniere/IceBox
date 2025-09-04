import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

function Filters() {
  return (
    <View style={styles.filters}>
      <TouchableOpacity style={styles.filterBtn}>
        <Text style={styles.filterText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterBtn}>
        <Text style={styles.filterText}>Soon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterBtn}>
        <Text style={styles.filterText}>Expired</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Filters;
