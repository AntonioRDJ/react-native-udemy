import {Text, StyleSheet, View} from 'react-native';

export const Square = (props: any) => {
  const size = 50;
  return <View style={{width: size, height: size, backgroundColor: props.color || "#000"}} />;
};
