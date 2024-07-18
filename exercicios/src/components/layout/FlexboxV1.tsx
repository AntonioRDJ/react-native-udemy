import { StyleSheet, Text, View } from 'react-native'
import { Square } from './Square';

export const FlexboxV1 = () => {
  return (
    <>
      <View style={style.FlexV1}>
        <Square color="#FF3346"/>
        <Square color="#39FF33" />
        <Square color="#33F3FF" />
        <Square color="#D733FF" />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  FlexV1: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  }
});