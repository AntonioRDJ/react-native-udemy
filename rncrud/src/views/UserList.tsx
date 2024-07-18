import { Alert, FlatList, ListRenderItemInfo, View } from "react-native";
import { User } from "../data/users";
import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export const UserList = ({ navigation }: any) => {

  const { state, dispatch }: any = useContext(UsersContext);

  function confirmUserDeletion(user: User) {
    Alert.alert("Excluir Usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress: () => {
          dispatch({type: "deleteUser", payload: user});
        },
      },
      {
        text: "Não"
      }
    ]);
  }

  function getActions(user: User) {
    return (
      <>
        <Button onPress={() => navigation.navigate("UserForm", user)} type="clear" icon={<Icon name="edit" size={25} color="orange" />} />
        <Button onPress={() => confirmUserDeletion(user)} type="clear" icon={<Icon name="delete" size={25} color="red" />} />
      </>
    );
  }
  
  function getuserItem({ item: user }: ListRenderItemInfo<User>) {
    return (
      <ListItem key={user.id} bottomDivider onPress={() => navigation.navigate("UserForm", user)}>
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getuserItem}
      />
    </View>
  );
};
