import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../actions/authActions";

const initialState = {
  user: {},
  isLoggedIn: localStorage.getItem("userID") === "" ? false : true,
  id: localStorage.getItem("userID"),
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.user = {};
      localStorage.removeItem("userID");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { addUser, login, logout } = authSlice.actions;
