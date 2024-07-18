import { createStackNavigator } from '@react-navigation/stack';
import { TelaA } from '../views/TelaA';
import { TelaB } from '../views/TelaB';
import { TelaC } from '../views/TelaC';
import { StackStep } from '../components/StackStep';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='TelaA' screenOptions={{ headerShown: true }}>
      <Stack.Screen name='TelaA' options={{title: "Informações iniciais"}}>
        {({ navigation }) => (
          <StackStep navigation={navigation} advance='TelaB'>
            <TelaA />
          </StackStep>
        )}
      </Stack.Screen>
      <Stack.Screen name='TelaB'>
        {(props) => (
          <StackStep {...props} advance='TelaC' goBack>
            <TelaB />
          </StackStep>
        )}
      </Stack.Screen>

      <Stack.Screen name='TelaC'>
        {({ navigation, route }) => (
          <StackStep navigation={navigation} advance='TelaC' goBack advanceParams={{number: 1007}}>
            <TelaC  navigation={navigation} route={route} />
          </StackStep>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}