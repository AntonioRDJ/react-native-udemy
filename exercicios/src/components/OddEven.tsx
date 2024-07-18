import {Text, View} from 'react-native';
import Styled from './estilo';

export const OddEven = ({num = 0}) => {
  const isOdd = num % 2 === 0;
  return (
    <View>
      <Text style={Styled.txtG}>O resultado é:</Text>
      {isOdd ? (
        <Text style={Styled.txtG}>Par</Text>
      ) : (
        <Text style={Styled.txtG}>Impar</Text>
      )}
    </View> 
  );
};
