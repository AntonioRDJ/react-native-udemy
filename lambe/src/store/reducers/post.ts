import {
  ADD_COMMENT,
  CREATING_POST,
  POST_CREATED,
  SET_POSTS,
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  isUploading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post: any) => {
          if (post.id === action.payload.postId) {
            post.comments = post.comments.concat(action.payload.comment);
          }
          return post;
        }),
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATING_POST:
      return {
        ...state,
        isUploading: true,
      };
    case POST_CREATED:
      return {
        ...state,
        isUploading: false,
      };
    default:
      return state;
  }
};

export default reducer;
