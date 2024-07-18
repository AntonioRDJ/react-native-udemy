import { Text, TextInput, View } from 'react-native'
import Styled from './estilo'
import { useState } from 'react';

export const InputName = () => {
  const [name, setName] = useState("jão");

  return (
    <View>
      <TextInput placeholder='Digite seu nome' value={name} onChangeText={(text) => setName(text)}/>
    </View>
  );
}