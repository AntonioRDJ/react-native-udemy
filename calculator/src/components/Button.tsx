import {Dimensions, StyleSheet, Text, TouchableHighlight} from 'react-native';

export const Button = (props: any) => {
  const stylesButton: any = [styles(props.grow).button];
  if(props.operation) stylesButton.push(styles().operationButton);
  return (
    <>
      <TouchableHighlight onPress={props.onClick}>
        <Text style={stylesButton}>{props.label}</Text>
      </TouchableHighlight>
    </>
  );
};

const styles = (grow = 1) => StyleSheet.create({
  button: {
    fontSize: 40,
    height: (Dimensions.get('window').width / 4),
    width: (Dimensions.get('window').width / 4) * grow,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: "#FFF",
    backgroundColor: "#fa8231"
  }
});
