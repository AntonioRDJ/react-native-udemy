import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type AuthInputProps = TextInputProps & {
  style: any;
  icon: any;
}

export const AuthInput = (props: AuthInputProps) => {
  const {style, icon, ...textInputProps } = props;

  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={20} style={styles.icon} />
      <TextInput {...textInputProps} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    backgroundColor: "#EEE",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#333",
    marginLeft: 20
  },
  input: {
    marginLeft: 20,
    width: "70%",
  }
});