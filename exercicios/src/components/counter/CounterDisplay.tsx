import { StyleSheet, Text, View } from 'react-native'
import Styled from '../estilo'

export const CounterDisplay = ({num}: any) => {


  return (
    <View style={style.Display}>
      <Text style={[Styled.txtG, style.DisplayText]}>{num}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  Display: {
    backgroundColor: '#000',
    padding: 20,
    width: 300,
  },
  DisplayText: {
    color: '#FFF',
  }
})