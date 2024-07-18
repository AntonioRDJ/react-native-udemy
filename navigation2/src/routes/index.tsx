import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./Stack";
import { TabNavigator } from "./Tab";
import { DrawerNavigator } from "./Drawer";



export const Router = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <DrawerNavigator /> */}
        <TabNavigator />
        {/* <StackNavigator /> */}
      </NavigationContainer>
    </SafeAreaView>
  );
};
