import { Text, FlatList } from 'react-native'
import Styled from '../estilo'
import { products } from './products';

export const ListProductsV2 = () => {

  return (
    <>
      <Text style={Styled.txtG}>Lista de Produtos V2</Text>
      <FlatList data={products} keyExtractor={i => `${i.id}`} renderItem={({item}) => (
        <Text>{item.id}) {item.name} tem R$ {item.price}</Text>
      )}/>
    </>
  );
}