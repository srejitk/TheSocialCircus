import {
  createUserWithEmailAndPassword} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase";

export const registerUser = async (userData, navigate, dispatch, login) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCreds.user;
    const { accessToken, uid } = user;
    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("userID", uid);
    dispatch(login(uid));
    createProfile(userData, uid);
    toast.success("You are part of the circus!");
    navigate("/home");
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/weak-password":
        return toast.error("Password should have more than 8 characters.");
      case "auth/email-already-in-use":
        return toast.error("This email is already in use.");
      default:
        console.log(error);
        return toast.error("Something went wrong. Try again later");
    }
  }
};
