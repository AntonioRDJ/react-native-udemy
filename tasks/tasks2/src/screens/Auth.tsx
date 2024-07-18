import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import loginImg from "assets/imgs/login.jpg";
import { commonStyles } from "../commonStyles";
import { useState } from "react";
import { AuthInput } from "../components/AuthInput";
import { server, showError, showSuccess } from "../common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthProps = {
  navigation: any;
}

export const Auth = (props: AuthProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("antonio@");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stageNew, setStageNew] = useState(false);

  const validations = [];

  validations.push(email && email.includes("@"));
  validations.push(password && password.length >= 6);

  if(stageNew) {
    validations.push(confirmPassword && confirmPassword === password);
    validations.push(name && name.trim().length >= 2);
  }

  const validForm = validations.reduce((t, a) => t && a);

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setStageNew(false);
  }

  const signinOrSignup = () => {
    if (stageNew) {
      signup();
    } else {
      signin();
    }
  };

  const signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }, {
        timeout: 3000
      });
      showSuccess("Usuário cadastrado");
      
      resetState();
      setStageNew(false);
    } catch (error) {
      showError(error);
    }
  }

  const signin = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: email,
        password: password,
      }, {
        timeout: 3000
      });

      AsyncStorage.setItem("userData", JSON.stringify(res.data));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      props.navigation.navigate("Drawer", {screen: "Today", params: res.data});
    } catch (error) {
      showError(error);
    }
  }

  return (
    <ImageBackground source={loginImg} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>

      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? "Crie a sua conta" : "Informe seus dados"}
        </Text>
        {stageNew && (
          <AuthInput
            icon="person"
            placeholder="Nome"
            value={name}
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
        )}

        <AuthInput
          icon="at"
          placeholder="Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <AuthInput
          icon="lock-closed"
          placeholder="Senha"
          secureTextEntry
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />

        {stageNew && (
          <AuthInput
            icon="lock-closed"
            placeholder="Confirmação de Senha"
            secureTextEntry
            value={confirmPassword}
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        )}

        <TouchableOpacity onPress={signinOrSignup} disabled={!validForm}>
          <View style={[styles.button, validForm ? {} : { backgroundColor: "#AAA" }]}>
            <Text style={styles.buttonText}>
              {stageNew ? "Registrar" : "Entrar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setStageNew((s) => !s)}
      >
        <Text style={styles.buttonText}>{stageNew ? "Já possui conta?" : "Ainda não possui conta?"}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    width: "90%",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
  },
});
