import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import userReducer from "./reducers/user";
import postsReducer from "./reducers/post";
import messageReducer from "./reducers/message";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  message: messageReducer,
});

const storeConfig = () => {
  return createStore(reducers, {}, applyMiddleware(thunk));
};

export default storeConfig;
