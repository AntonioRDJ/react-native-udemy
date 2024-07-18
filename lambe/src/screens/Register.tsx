import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { createUser } from "../store/actions/user";

const RegisterComponent = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const prevPropsIsLoading = useRef(null);

  useEffect(() => {
    if(prevPropsIsLoading.current && !props.isLoading && props.name) {
      clearStates();
      props.navigation.navigate("Profile");
    }
    prevPropsIsLoading.current = props.isLoading;
  }, [props.isLoading]);

  const clearStates = () => {
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => props.onCreateUser({name, email, password})} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#4286f4",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFF",
  },
  input: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#EEE",
    height: 40,
    borderWidth: 1,
    borderColor: "#333",
    paddingLeft: 15,
  }
});

const mapStateToProps = ({user}: any) => {
  return {
    isLoading: user.isLoading,
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCreateUser: (user: any) => dispatch(createUser(user))
  }
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);