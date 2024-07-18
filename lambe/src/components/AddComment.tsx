import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback as TWF,
  TextInput,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../store/actions/posts";

const AddCommentComponent = (props: any) => {
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(true);

  const handleAddComment = () => {
    props.onAddComment({
      postId: props.postId,
      comment: {
        nickname: props.name,
        comment,
      }
    });
    setComment("");
    setEditMode(false);
  };

  let commentArea = null;

  if (editMode) {
    commentArea = (
      <View style={styles.container}>
        <TextInput
          placeholder="Pode comentar..."
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
          onSubmitEditing={handleAddComment}
        />
        <TWF onPress={() => setEditMode(false)}>
          <Icon name="times" size={15} color="#555" />
        </TWF>
      </View>
    );
  } else {
    commentArea = (
      <TWF onPress={() => setEditMode(true)}>
        <View style={styles.container}>
          <Icon name="comment-o" size={25} color="#555" />
          <Text style={styles.caption}>Adicione um comentário...</Text>
        </View>
      </TWF>
    );
  }

  return (
    <View style={{flex: 1}}>
      {commentArea}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: "#CCC",
  },
  input: {
    width: "90%"
  }
});

const mapStateToProps = ({user}: any) => {
  return {
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddComment: (payload: any) => dispatch(addComment(payload))
  }
}

export const AddComment = connect(mapStateToProps, mapDispatchToProps)(AddCommentComponent);