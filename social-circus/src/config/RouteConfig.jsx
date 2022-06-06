import React from "react";
import { Route, Routes } from "react-router-dom";
import { Error, Feed, Home, Login, Profile, Signup, Update } from "../routes";

export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="update" element={<Update />} />
      <Route path="feed" element={<Feed />} />
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
