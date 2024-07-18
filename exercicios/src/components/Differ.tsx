
import { Text, Platform } from 'react-native'
import Styled from './estilo'

export const Differ = () => {
  if(Platform.OS === "android") {
    return <Text style={Styled.txtG}>Android</Text>;
  } else if(Platform.OS === "ios") {
    return <Text style={Styled.txtG}>iOS</Text>;
  }
  return <Text style={Styled.txtG}>Eita!!!</Text>;
}