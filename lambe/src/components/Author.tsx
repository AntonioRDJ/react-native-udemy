import { View, Text, StyleSheet } from 'react-native';
import { Gravatar } from './Gravatar';

type AuthorProps = {
  email?: string;
  nickname?: string;
}

export const Author = (props: AuthorProps) => {
  return (
    <View style={styles.container}>
      <Gravatar email={props.email} style={styles.avatar} />
      <Text style={styles.nickname}>{props.nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  nickname: {
    color: "#444",
    marginVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
  }
});