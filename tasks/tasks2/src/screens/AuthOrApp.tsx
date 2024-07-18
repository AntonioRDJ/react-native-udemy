import { ActivityIndicator, StyleSheet, View } from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { ParamListBase, RouteProp, useFocusEffect } from "@react-navigation/native";

type AuthOrAppProps = {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<ParamListBase, "AuthOrApp">;
};

export const AuthOrApp = (props: AuthOrAppProps) => {

  useFocusEffect(() => {
    async function getData() {
      const userDataJson = await AsyncStorage.getItem("userData");
      let userData = null;
      try {
        userData = JSON.parse(userDataJson!);
      } catch (error) {
        // userData invalido
      }

      if (userData && userData.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
        props.navigation.navigate("Drawer", {
          screen: "Today",
          params: userData,
        });
      } else {
        props.navigation.navigate("Auth");
      }
    }
    getData();
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
