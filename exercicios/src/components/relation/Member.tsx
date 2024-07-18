import { Text } from 'react-native'
import Styled from '../estilo'

export const Member = (props: {name: string, lastName: string}) => {
  return (
    <>
      <Text style={Styled.txtG}>{props.name} {props.lastName}</Text>
    </>
  );
}