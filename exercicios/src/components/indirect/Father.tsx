import { Text } from 'react-native'
import Styled from '../estilo'
import { Children } from './Children';
import { useState } from 'react';

export const FatherIndirect = () => {
  const [num, setNum] = useState(0);
  
  function showValue(number: number) {
    setNum(number);
  }

  return (
    <>
      <Text style={Styled.txtG}>Father - Número gerado: {num}</Text>
      <Children min={1} max={50} func={showValue} />
    </>
  );
}