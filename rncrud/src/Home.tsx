import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { UserList } from "./views/UserList";
import { UserForm } from "./views/UserForm";
import { Button, Icon } from "@rneui/themed";
import { UsersProvider } from "./context/UsersContext";

const Stack = createStackNavigator();

export const Home = () => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}
        >
          <Stack.Screen name="UserList" component={UserList} options={({ navigation }) => ({
            title: "Lista de Usuários",
            headerRight: () => (<Button onPress={() => navigation.navigate("UserForm")} type="clear" icon={<Icon name="add" size={25} color="#FFF" />} />)
          })} />
          <Stack.Screen name="UserForm" component={UserForm} options={{
            title: "Formulário de Usuários"
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
