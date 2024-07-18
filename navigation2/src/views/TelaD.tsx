import { Button, View } from "react-native";
import { TextCenter } from "../components/TextCenter";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

export const TelaD = ({
  navigation,
  route,
}: {
  navigation?: NavigationProp<any, any>;
  route?: RouteProp<ParamListBase, "TelaC">;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button title="Abrir" onPress={() => navigation.openDrawer()} />
        {/* <Button title="Fechar" onPress={() => navigation.closeDrawer()} /> */}
      </View>
      <View style={{ flex: 1 }}>
        <TextCenter background="#33fa72" textColor="#000">
          Tela D
        </TextCenter>
      </View>
    </View>
  );
};
