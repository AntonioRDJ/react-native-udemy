import {useState} from 'react';
import {Button, Text} from 'react-native';
import Styled from "./estilo";

export const Counter = ({init = 0, step = 1}: any) => {
  const [number, setNumber] = useState<number>(init);

  const increment = () => setNumber(n => n + step);
  const decrement = () => setNumber(n => n - step);

  return (
    <>
      <Text style={Styled.txtG}>{number}</Text>
      <Button title="+" onPress={increment} />
      <Button title="-" onPress={decrement} />
    </>
  );
};
