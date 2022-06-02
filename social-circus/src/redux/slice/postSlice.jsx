import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  post: {},
  posts: [],
  sortBy: "trending",
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: {},
});

export const { setPost } = PostSlice.actions;

export default PostSlice.reducer;
