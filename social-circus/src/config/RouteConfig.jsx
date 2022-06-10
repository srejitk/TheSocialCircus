import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Error,
  Saved,
  Home,
  Login,
  Profile,
  Signup,
  Update,
  User,
} from "../routes";

export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/update" element={<Update />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:userName" element={<User />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
