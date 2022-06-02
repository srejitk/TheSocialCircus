import "./App.css";
import { CreatePost, Header } from "./components";
import { RouteConfig } from "./config/RouteConfig";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "./redux/slice/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userCreds) => {
      if (userCreds) {
        dispatch(
          login({
            email: userCreds.email,
            uid: userCreds.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });
  return (
    <div className="App">
      <Header />
      <CreatePost />
      <RouteConfig />
      <Toaster />
    </div>
  );
}

export default App;
