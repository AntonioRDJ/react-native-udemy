import { Text } from 'react-native'
import Styled from '../estilo'
import { Member } from './Member';
import { PropsWithChildren } from 'react';

export const Family = (props: PropsWithChildren) => {
  return (
    <>
      <Text>Membros da Família:</Text>
      {props.children}
    </>
  );
}