import { Text } from "react-native";
import Styled from "./estilo";

export const Title = (props: any) => {
  return (
    <>
      <Text style={Styled.txtG}>{props.primary}</Text>
      <Text>{props.secondary}</Text>
    </>
  );
}