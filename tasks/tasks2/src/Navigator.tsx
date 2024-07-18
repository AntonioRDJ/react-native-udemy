import { TaskList } from "./screens/TaskList";
import { Auth } from "./screens/Auth";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "./screens/Menu";
import { commonStyles } from "./commonStyles";
import { AuthOrApp } from "./screens/AuthOrApp";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthOrApp"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthOrApp" >
          {(props) => (
            <AuthOrApp {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Drawer" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 60,
        drawerLabelStyle: {
          fontFamily: commonStyles.fontFamily,
          fontWeight: "normal",
          fontSize: 20,
        },
      }}
      drawerContent={Menu}
    >
      <Drawer.Screen name="Today" options={{ title: "Hoje" }}>
        {(props) => <TaskList title="Hoje" daysAhead={0} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Tomorrow" options={{ title: "Amanhã" }}>
        {(props) => <TaskList title="Amanhã" daysAhead={1} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Week" options={{ title: "Semana" }}>
        {(props) => <TaskList title="Semana" daysAhead={7} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Month" options={{ title: "Mês" }}>
        {(props) => <TaskList title="Mês" daysAhead={30} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
