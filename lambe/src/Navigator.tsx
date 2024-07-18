import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/FontAwesome";
import { Feed } from "./screens/Feed";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddPhoto } from "./screens/AddPhoto";
import { Profile } from "./screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Splash } from "./screens/Splash";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="App" component={AppRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const AuthOrProfile = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          title: "Add Picture",
          tabBarIcon: ({ color }) => (
            <Icon name="camera" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AuthOrProfile"
        component={AuthOrProfile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
