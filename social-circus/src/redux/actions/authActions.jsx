import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase";

export const registerUser = async (userData, navigate, dispatch, actions) => {
  const { firstName, lastName, email, password } = userData;
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCreds;
    await updateProfile(user, {
      displayName: firstName + " " + lastName,
    });
    const { uid } = user;
    localStorage.setItem("userID", uid);
    createProfile(userData, uid);
    dispatch(getUserData(uid));
    actions.resetForm();
    toast.success("You are part of the circus!");
    navigate("/");
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

const createProfile = async (user, uid) => {
  try {
    await setDoc(doc(db, "users", uid), {
      firstname: user.firstName,
      lastname: user.lastName,
      displayName: user.firstName + " " + user.lastName,
      email: user.email,
      bio: "Your Bio. Make it yours. ",
      website: "Update you website here",
      followers: [],
      following: [],
      avatar:
        "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1654681094/The%20Social%20Circus/Avatars/1_W35QUSvGpcLuxPo3SRTH4w_k7jues.png",
      cover:
        "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1654681236/The%20Social%20Circus/Avatars/Circus-Flat-Mark-Bird-Illustration_zjuqte.jpg",
      username: "username",
      bookmarks: [],
      archive: [],
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    toast.error("Couldn't create user");
    console.log(error);
  }
};

export const getUserData = createAsyncThunk("auth/getUserData", async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  } catch (error) {
    console.log("Could not retrieve user data");
  }
});

export const loginUser = async (userData, navigate, dispatch, login) => {
  const { email, password } = userData;
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;
    const { uid } = user;
    localStorage.setItem("userID", uid);
    dispatch(login());
    dispatch(getUserData(uid));
    navigate("/");
    toast.success("You're signed in!");
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/wrong-password":
        return toast.error("Check your password again.");
      case "auth/invalid-email":
        return toast.error("Check your Email ID again.");
      case "auth/user-not-found":
        return toast.error("You need to sign us first!");
      default:
        console.log(error);
        return toast.error("Something went wrong. Try again later");
    }
  }
};

export const updateDetails = async (profile, uid, dispatch, navigate) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        bio: profile?.bio,
        website: profile?.portfolio,
        avatar: profile?.avatar,
        cover: profile?.cover,
        username: profile?.username,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    dispatch(getUserData(uid));
    toast.success("Your profile is updated!");
    navigate("/profile");
  } catch (error) {
    toast.error("Couldn't create user");
    console.log(error);
  }
};

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  const allUsers = [];
  const usersRef = collection(db, "users");
  try {
    const q = query(usersRef);
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      allUsers.push({ data: doc.data(), id: doc.id });
    });
    return allUsers;
  } catch (error) {
    console.log(error);
  }
});
