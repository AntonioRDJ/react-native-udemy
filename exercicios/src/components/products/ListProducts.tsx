import { Text } from 'react-native'
import Styled from '../estilo'
import { products } from './products';

export const ListProducts = () => {

  return (
    <>
      <Text style={Styled.txtG}>Lista de Produtos</Text>
      {products.map(product => (
        <Text key={product.id}>{product.id}) {product.name} tem R$ {product.price}</Text>
      ))}
    </>
  );
}