import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { TextCenter } from "../components/TextCenter";

export const TelaC = ({ navigation, route }: { navigation?: NavigationProp<any, any>, route?: RouteProp<ParamListBase, "TelaC"> }) => {
  const numero = route && route.params && route.params.number ? route.params.number : 0;
  return <TextCenter background="#9932cd">Tela C - {numero}</TextCenter>;
};
