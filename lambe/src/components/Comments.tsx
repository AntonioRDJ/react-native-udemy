import { View, Text, StyleSheet } from 'react-native';

type CommentsProps = {
  comments: any[];
};

export const Comments = (props: CommentsProps) => {
  let view = null;

  if(props.comments) {
    view = props.comments.map((item, index) => (
      <View key={index} style={styles.commentContainer}>
        <Text style={styles.nickname}>{item.nickname}: </Text>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      {view}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  nickname: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#444",
  },
  comment: {
    color: "#555"
  },
});