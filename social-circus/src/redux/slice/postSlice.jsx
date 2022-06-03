import { createSlice } from "@reduxjs/toolkit";
import { getExplorePosts } from "../actions/postActions";

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
    postLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExplorePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExplorePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        //TODO ADD SORTING HERE
      })
      .addCase(getExplorePosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPost, postLoading } = PostSlice.actions;

export default PostSlice.reducer;
