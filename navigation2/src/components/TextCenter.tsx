import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type TextCenterProps = PropsWithChildren & {
  background?: string;
  textColor?: string;
};

export const TextCenter = ({ children , background, textColor}: TextCenterProps) => {
  return (
    <View style={{flex: 1,justifyContent: "center", alignItems: "center", backgroundColor: background || "#000"}}>
      <Text style={{fontSize: 50, color: textColor || "#FFF"}}>{children}</Text>
    </View>
  );
}