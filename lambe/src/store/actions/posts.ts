import axios from "axios";
import {
  SET_POSTS,
  CREATING_POST,
  POST_CREATED,
} from "./actionTypes";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";
import app from "../../../firebaseConfig";
import { setMessage } from "./message";

async function uriToBlob(uri: string) {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
}

export const addPost = (post: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(creatingPost());
      const imageBlob = await uriToBlob(post.image.uri);
      const imageId = uuidV4();
      const storageRef = ref(getStorage(app), `/posts/${imageId}.jpeg`);
      const result = await uploadBytes(storageRef, imageBlob, {
        contentType: "image/jpeg",
      });
      const fileFullpath = encodeURIComponent(result.ref.fullPath);
      const imageUrl =
        "https://firebasestorage.googleapis.com/v0/b/" +
        result.ref.bucket +
        "/o/" +
        fileFullpath +
        "?alt=media";

      post.image = imageUrl;
      const res = await axios.post(`/posts.json?auth=${getState().user.token}`, post);
      dispatch(postCreated());
      dispatch(fetchPosts());
    } catch (error) {
      dispatch(setMessage({title: "Erro", text: error}));
      console.log("error ", error);
    }
  };
};

export const addComment = (payload: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios.get(`/posts/${payload.postId}.json`);
      const comments = res.data.comments || [];
      comments.push(payload.comment);

      await axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments });
      dispatch(fetchPosts());
    } catch (error) {
      console.warn("error", error);
    }
  };
};

export const setPosts = (posts: any) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};

export const fetchPosts = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/posts.json");
      const rawPosts = res.data;
      const posts = [];
      for (const key in rawPosts) {
        posts.push({ ...rawPosts[key], id: key });
      }
      dispatch(setPosts(posts.toReversed()));
    } catch (error) {
      console.warn("error", error);
    }
  };
};

export const creatingPost = () => {
  return {
    type: CREATING_POST,
  };
};

export const postCreated = () => {
  return {
    type: POST_CREATED,
  };
};
