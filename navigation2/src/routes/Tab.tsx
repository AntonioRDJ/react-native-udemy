import { TelaA } from "../views/TelaA";
import { TelaB } from "../views/TelaB";
import { TelaC } from "../views/TelaC";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
        // tabBarLabelStyle: { fontSize: 30 },
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          switch (route.name) {
            case "TelaA":
              iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
              break;
            case "TelaB":
              iconName = focused ? 'list' : 'list-outline';
              break;
            case "TelaC":
              iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },      
      })}
      initialRouteName="TelaB"
    >
      <Tab.Screen name="TelaA" component={TelaA} options={{title: "Inicial"}} />
      <Tab.Screen name="TelaB" component={TelaB} />
      <Tab.Screen name="TelaC" component={TelaC} />
    </Tab.Navigator>
  );
};
