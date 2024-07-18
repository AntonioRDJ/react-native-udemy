import { Text } from "react-native"
import Estilo from './estilo';

export default (props: any) => {
  console.warn(props);
  return (
    <Text style={Estilo.txtG}>O valor {props.max} é maior que o valor {props.min}</Text>
  )
}