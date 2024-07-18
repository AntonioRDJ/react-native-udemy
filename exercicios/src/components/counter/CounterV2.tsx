import { Text } from 'react-native'
import Styled from '../estilo'
import { useState } from 'react';
import { CounterDisplay } from './CounterDisplay';
import { CounterButtons } from './ContadorButtons';

export const CounterV2 = () => {
  const [num, setNum] = useState(0);

  const inc = () => setNum(num + 1);
  const dec = () => setNum(num - 1);

  return (
    <>
      <Text style={Styled.txtG}>ContadorV2</Text>
      <CounterDisplay num={num} />
      <CounterButtons inc={inc} dec={dec} />
    </>
  );
}