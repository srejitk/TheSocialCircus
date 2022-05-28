import React from "react";
import { Route, Routes } from "react-router-dom";
import { Error, Explore, Feed, Home, Login, Profile, Signup } from "../routes";

export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
