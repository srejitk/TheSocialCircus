import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../actions/authActions";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  token: localStorage.getItem("userID"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("userID");
      return initialState;
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
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { login, logout, setLoading } = authSlice.actions;
