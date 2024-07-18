import { Button, StyleSheet, Text, View } from 'react-native'
// import Styled from '../estilo'

export const CounterButtons = (props: any) => {
  return (
    <View style={style.Botoes}>
      <Button title='+' onPress={props.inc} />
      <Button title='-' onPress={props.dec} />
    </View>
  );
}

const style = StyleSheet.create({
  Botoes: {
    flexDirection: 'row',
  }
});