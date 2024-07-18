import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Gravatar } from "../components/Gravatar";
import { connect } from "react-redux";
import { logout } from "../store/actions/user";

const ProfileComponent = (props: any) => {
  const handleLogout = () => {
    props.onLogout();
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Gravatar email={props.email} style={styles.avatar} />
      <Text style={styles.nickname}>{props.name}</Text>
      <Text style={styles.email}>{props.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 100,
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    marginTop: 20,
    fontSize: 25,
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
});

const mapStateToProps = ({user}: any) => {
  return {
    email: user.email,
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
