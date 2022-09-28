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
  Explore,
  Landing,
} from "../routes";
import { PrivateRoutes } from "./PrivateRoutes";

export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Landing />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/update" element={<Update />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userID" element={<User />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};
