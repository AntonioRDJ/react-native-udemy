import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../store/actions/posts";

const noUser = "Você precisa estar logado para adicionar imagens";

const AddPhotoComponent = (props: any) => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [comment, setComment] = useState("");
  const prevPropsLoading = useRef(null);

  useEffect(() => {
    if(prevPropsLoading.current && !props.loading) {
      clearStates();
      props.navigation.navigate("Feed");
    }
    prevPropsLoading.current = props.loading;
  }, [props.loading]);

  const pickImageAsync = async () => {
    if(!props.name) {
      Alert.alert("Falha!", noUser);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const clearStates = () => {
    setImage(null);
    setComment("");
  }

  const save = async () => {
    if(!props.name) {
      Alert.alert("Falha!", noUser);
      return;
    }
    props.onAddPost({
      id: Math.random(),
      nickname: props.name,
      email: props.email,
      image: image,
      comments: [{
        nickname: props.name,
        comment: comment,
      }],
    });
    // clearStates();
    // props.navigation.navigate("Feed");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Compartilhe sua imagem</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image?.uri}} style={styles.image} />
        </View>
        <TouchableOpacity onPress={pickImageAsync} style={styles.button}>
          <Text style={styles.buttonText}>Escolha a foto</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Algum comentário para a foto"
          style={styles.input}
          editable={!!props.name}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={save} disabled={props.loading} style={[styles.button, props.loading ? styles.buttonDisabled : {}]}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "90%",
    height: Dimensions.get("window").width / 2,
    backgroundColor: "#EEE",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").width / 2,
    resizeMode: "center",
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#4286f4"
  },
  buttonDisabled: {
    backgroundColor: "#AAA",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFF"
  },
  input: {
    marginTop: 20,
    width: "90%",
  }
});

const mapStateToProps = ({user, posts}: any) => {
  return {
    email: user.email,
    name: user.name,
    loading: posts.isUploading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddPost: (post: any) => dispatch(addPost(post))
  }
}

export const AddPhoto = connect(mapStateToProps, mapDispatchToProps)(AddPhotoComponent);