import "./App.css";
import { CreatePost, Header } from "./components";
import { RouteConfig } from "./config/RouteConfig";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getExplorePosts } from "./redux/actions/postActions";
import { getUserData } from "./redux/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userID");

  useEffect(() => {
    dispatch(getExplorePosts());
    dispatch(getUserData(token));
  }, [token]);
  return (
    <div className="App">
      <Header />
      <RouteConfig />
      <Toaster />
      {/* <CreatePost /> */}
    </div>
  );
}

export default App;
