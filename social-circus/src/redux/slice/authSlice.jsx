import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserData } from "../actions/authActions";

const initialState = {
  user: {},
  allUsers: [],
  isLoggedIn: false,
  isLoading: false,
  otherUser: {},
  token: localStorage.getItem("userID"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("userID");
    },
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = localStorage.getItem("userID");
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { login, logout, setLoading, setOtherUser } = authSlice.actions;
