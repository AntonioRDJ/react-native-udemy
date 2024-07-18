import axios from "axios";
import { LOADING_USER, USER_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT } from "./actionTypes";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../firebaseConfig";

export const userLogged = (user: any) => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const createUser = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(loadingUser());
      const auth = getAuth(app);
  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email as string,
        user.password as string,
      );
      const firebaseUser = userCredential.user;
      await axios.put(`/users/${firebaseUser.uid}.json`, {
        name: user.name,
      });
      dispatch(login(user));
    } catch (error) {
      console.warn("error ", error);
    }
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER
  };
};

export const userLoaded = () => {
  return {
    type: USER_LOADED
  };
};

export const login = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(loadingUser());
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const firebaseUser = userCredential.user;
      user.token = await firebaseUser.getIdToken();
      const databaseUser = await axios.get(`/users/${firebaseUser.uid}.json`);

      delete user.password;
      user.name = databaseUser.data.name;
      dispatch(userLogged(user));
    } catch (error) {
      console.warn("error", error);
    } finally {
      dispatch(userLoaded());
    }
  };
};