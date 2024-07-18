import { Alert, Platform } from "react-native";

// export const server = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";
export const server = "https://f82a-187-74-19-180.ngrok-free.app";

export function showError(err: any) {
  if(err.response && err.response.data) {
    Alert.alert("Ops! Ocorreu um problema!", `Mensagem: ${err.response.data}`);
  } else {
    Alert.alert("Ops! Ocorreu um problema!", `Mensagem: ${Object.keys(err)}`);
  }
}

export function showSuccess(msg: any) {
  Alert.alert("Sucesso!", msg);
}