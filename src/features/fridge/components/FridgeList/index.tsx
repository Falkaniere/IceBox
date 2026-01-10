import { FlatList } from 'react-native';

import FridgeItem from '../fridgeItem';

function FridgeList({ data }: { data: any[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <FridgeItem item={item} />}
    />
  );
}

export default FridgeList;
