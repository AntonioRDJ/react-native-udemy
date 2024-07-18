import { Text } from 'react-native'
import Styled from '../estilo'
import { Children } from './Children';

export const Father = () => {
  let x = 13;
  let y = 100;
  return (
    <>
      <Text style={Styled.txtG}>Father</Text>
      <Children a={x} b={y} />
      <Children a={x+100} b={y+200} />
    </>
  );
}