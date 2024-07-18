import { StyleSheet, Text, View } from 'react-native'
import Styled from '../estilo'

export const MegaNumber = ({num}: any) => {
  return (
    <View style={style.Container}>
      <Text style={[Styled.txtG, style.Number]}>{num}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    backgroundColor: "#000",
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 25,
  },
  Number: {
    color: "#FFF"
  }
});