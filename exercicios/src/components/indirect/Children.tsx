import {Button, Text} from 'react-native';
import Styled from '../estilo';

export const Children = (props: any) => {
  function generateRandomNumber(min: number, max: number) {
    const fator = max - min + 1;
    return Math.floor(Math.random() * fator) + min;
  }

  return (
    <>
      <Button
        title="Aperte"
        onPress={() => {
          const n = generateRandomNumber(props.min, props.max);
          props.func(n);
        }}
      />
    </>
  );
};
