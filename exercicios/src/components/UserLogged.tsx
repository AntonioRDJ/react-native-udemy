import { Text } from "react-native";
import Styled from "./estilo";
import { If } from "./If";

export const UserLogged = ({user = {} as any}) => {

  return (
    <>
      <If test={user && user.name}>
        <Text style={Styled.txtG}>Usuário Logado:</Text>
        <Text style={Styled.txtG}>{user.name} - {user.email}</Text>
      </If>
    </>
  );
}