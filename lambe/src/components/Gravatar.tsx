import { View, StyleSheet, Image } from 'react-native';
import { SHA256 } from "crypto-js";

function gravatarImg(email: string) {
  return `https://gravatar.com/avatar/${SHA256(email.trim())}`;
}

type GravatarProps = {
  style?: any;
  email?: string;
}

export const Gravatar = (props: GravatarProps) => {
  const email = props.email || "";
  return (
    <View style={[styles.avatar, props.style]}>
      <Image resizeMode='cover' source={{ uri: gravatarImg(email)}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  }
});