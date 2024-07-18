import { NavigationProp } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { Button, View } from 'react-native';

type StackStepProps = PropsWithChildren & {
  advance?: string;
  advanceParams?: any;
  goBack?: boolean;
  navigation: NavigationProp<any, any>;
}

export const StackStep = (props: StackStepProps) => {
  const { advance, advanceParams, goBack, navigation, children } = props;

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        {goBack && (<Button title='Voltar' onPress={() => navigation.goBack()} />)}
        {props.advance && (<Button title='Avançar' onPress={() => navigation.push(advance, advanceParams || null)} />)}
      </View>
      <View style={{flex: 1}}>
        {children}
      </View>
    </View>
  );
}