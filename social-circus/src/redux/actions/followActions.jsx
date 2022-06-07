import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { setOtherUser } from "../slice/authSlice";
import { getAllUsers, getUserData } from "./authActions";

export const followUser = async (
  user,
  othersData,
  othersID,
  token,
  dispatch
) => {
  try {
    const userRef = doc(db, "users", token);
    const otheruserRef = doc(db, "users", othersID);
    const response = await setDoc(
      userRef,
      {
        following: arrayUnion(othersID),
      },
      { merge: true }
    );
    const otherResponse = await setDoc(
      otheruserRef,
      {
        followers: arrayUnion(token),
      },
      { merge: true }
    );
    dispatch(getUserData(token));
    dispatch(getAllUsers());
    dispatch(setOtherUser({ data: othersData, id: othersData }));
    toast.success(`You now follow ${othersData?.username}`);
  } catch (error) {
    console.log(error);
    toast.error("Something happened. try again");
  }
};

export const unfollowUser = async (
  user,
  othersData,
  othersID,
  token,
  dispatch
) => {
  try {
    const userRef = doc(db, "users", token);
    const otheruserRef = doc(db, "users", othersID);
    const response = await setDoc(
      userRef,
      {
        following: arrayRemove(othersID),
      },
      { merge: true }
    );
    const otherResponse = await setDoc(
      otheruserRef,
      {
        followers: arrayRemove(token),
      },
      { merge: true }
    );
    dispatch(getUserData(token));
    dispatch(getAllUsers());
    toast.success(`You have unfollowed ${othersData?.username}`);
  } catch (error) {
    console.log(error);
    toast.error("Something happened. try again");
  }
};
