import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { User } from "../data/users";
import { useContext, useState } from "react";
import { UsersContext } from "../context/UsersContext";

export const UserForm = ({ route, navigation }: any) => {
  const [user, setUser] = useState<User>(route.params ?? {});

  const { state, dispatch }: any = useContext(UsersContext);

  return (
    <View style={styles.form}>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setUser((u) => ({ ...u, name }))}
        placeholder="Informe o Nome"
        value={user.name}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(email) => setUser((u) => ({ ...u, email }))}
        placeholder="Informe o Email"
        value={user.email}
      />

      <Text>Url do Avatar</Text>
      <TextInput
        style={styles.input}
        onChangeText={(avatarUrl) => setUser((u) => ({ ...u, avatarUrl }))}
        placeholder="Informe a Url do Avatar"
        value={user.avatarUrl}
      />

      <Button title="Salvar" onPress={() => {
        dispatch({ type: user.id ? "updateUser" : "createUser", payload: user });
        navigation.goBack();
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
