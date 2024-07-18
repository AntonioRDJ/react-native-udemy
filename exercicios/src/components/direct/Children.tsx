import { Text } from 'react-native'
import Styled from '../estilo'

export const Children = ({a, b}: any) => {
  return (
    <>
      <Text style={Styled.txtG}>{a}</Text>
      <Text style={Styled.txtG}>{b}</Text>
    </>
  );
}