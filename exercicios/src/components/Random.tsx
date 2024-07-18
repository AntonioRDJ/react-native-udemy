import { Text } from "react-native";
import Style from "./estilo";

type RandomProps = {
  min: number;
  max: number;
}

export const Random = ({ min, max }: RandomProps) => {
  const randomNumber = randomInteger(min, max);
  return (
    <Text style={Style.txtG}>Seu número aleatório é: {randomNumber}</Text>
  );
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
