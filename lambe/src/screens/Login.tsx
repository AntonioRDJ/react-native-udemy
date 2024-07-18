import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { login } from "../store/actions/user";

const LoginComponent = (props: any) => {
  const [email, setEmail] = useState("antonio1@teste.com");
  const [password, setPassword] = useState("");
  const prevPropsIsLoading = useRef(null);

  useEffect(() => {
    if(prevPropsIsLoading.current && !props.isLoading && props.name) {
      props.navigation.navigate("Profile");
    }
    prevPropsIsLoading.current = props.isLoading;
  }, [props.isLoading]);
  
  const handleLogin = () => {
    props.onLogin({email, password});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} disabled={props.isLoading} style={[styles.button, props.isLoading ? styles.buttonDisabled : {}]}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Register")} style={styles.button}>
        <Text style={styles.buttonText}>Criar nova conta</Text>
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
  buttonDisabled: {
    backgroundColor: "#AAA",
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
  },
});

const mapStateToProps = ({user}: any) => {
  return {
    isLoading: user.isLoading,
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogin: (user: any) => dispatch(login(user))
  }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
