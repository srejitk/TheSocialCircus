import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import postReducer from "./slice/postSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  thunk,
});
