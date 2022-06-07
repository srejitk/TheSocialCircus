import "./App.css";
import { Header, Sidebar } from "./components";
import { RouteConfig } from "./config/RouteConfig";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getExplorePosts } from "./redux/actions/postActions";
import { getAllUsers, getUserData } from "./redux/actions/authActions";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userID");

  useEffect(() => {
    dispatch(getExplorePosts());
    dispatch(getUserData(token));
    dispatch(getAllUsers());
  }, [token]);
  const { pathname } = useLocation();

  return (
    <div className="App grid grid-cols-3 gap-x-4">
      {pathname === "/signup" ||
      pathname === "/login" ||
      pathname === "/update" ? null : (
        <Header />
      )}
      {pathname === "/signup" ||
      pathname === "/login" ||
      pathname === "/update" ? null : (
        <Sidebar />
      )}
      <RouteConfig />
      <Toaster />
    </div>
  );
}

export default App;
