import { configureStore } from "@reduxjs/toolkit";
console.log("STORE CREATED");
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import postReducer from "./postSlice";
import statsReducer from "./statsSlice";
import followersReducer from "./followersSlice";
import followingReducer from "./followingSlice";
import followReducer from "./followSlice";
console.log(authReducer);
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postReducer,
    stats: statsReducer,
    followers: followersReducer,
    following: followingReducer,
    follow: followReducer,
  },
});