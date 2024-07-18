import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import icon from "assets/imgs/icon.png";
import { connect } from 'react-redux';
import { Gravatar } from './Gravatar';

const HeaderComponent = (props: any) => {
  const name = props.name || "Anonymous";
  const gravatar = props.email ? (
    <Gravatar email={props.email} style={styles.avatar} />
  ) : null;
  
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.title}>Lambe Lambe</Text>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.user}>{name}</Text>
        {gravatar}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: Platform.OS === "ios" ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#BBB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  title: {
    color: "#000",
    fontFamily: "shelter",
    height: 30,
    fontSize: 28,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    fontSize: 10,
    color: "#888",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  }
});

const mapStateToProps = ({user}: any) => {
  return {
    email: user.email,
    name: user.name,
  }
}

export const Header = connect(mapStateToProps)(HeaderComponent);