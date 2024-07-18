import { View, StyleSheet, FlatList } from "react-native";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { connect } from "react-redux";
import { fetchPosts } from "../store/actions/posts";
import { useEffect } from "react";

const FeedComponent = (props: any) => {

  useEffect(() => {
    props.onFetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={props.posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <Post {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5fcff",
  },
});

const mapStateToProps = ({user, posts}: any) => {
  return {
    posts: posts.posts,
    email: user.email,
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchPosts: () => dispatch(fetchPosts()),
  }
}

export const Feed = connect(mapStateToProps, mapDispatchToProps)(FeedComponent);
