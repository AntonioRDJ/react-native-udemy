import { DrawerItemList, DrawerContentScrollView, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SHA256 } from "crypto-js";
import { commonStyles } from '../commonStyles';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function gravatarImg(email: string) {
  return `https://gravatar.com/avatar/${SHA256(email.trim())}`;
}

export const Menu = (props: DrawerContentComponentProps) => {
  const email: string = (props.state.routes[0].params as any).email || "" ;
  const name: string = (props.state.routes[0].params as any).name || "" ;

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    AsyncStorage.removeItem("userData");
    props.navigation.navigate("AuthOrApp");
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.avatar}>
          <Image resizeMode='cover' source={{ uri: gravatarImg(email)}} style={styles.image} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={styles.logoutIcon}>
            <Ionicons name='log-out' size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  title: {
    color: "#000",
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  userInfo: {
    marginLeft: 10,
    marginBottom: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 3,
    color: commonStyles.colors.mainText,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.subText,
  },
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10,
  }
});