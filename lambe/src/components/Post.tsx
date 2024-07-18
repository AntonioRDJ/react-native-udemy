import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Author } from './Author';
import { Comments } from './Comments';
import { AddComment } from './AddComment';
import { connect } from 'react-redux';

type PostProps = {
  id: any,
  image: any,
  comments: any[],
  email: string;
  nickname: string;
  [key: string]: any;
}

export const PostComponent = (props: PostProps) => {
  const addComment = !!props.name ? (<AddComment postId={props.id} />) : null;
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <Author email={props.email} nickname={props.nickname} />
      <Comments comments={props.comments} />
      {addComment}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 3 / 4,
    resizeMode: "contain",
  }
});

const mapStateToProps = ({user}: any) => {
  return {
    name: user.name,
  }
}

export const Post = connect(mapStateToProps)(PostComponent);