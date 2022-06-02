import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";

export const AddPost = async (post, dispatch) => {
  const postRef = collection(db, "posts");
  try {
    await addDoc(postRef, post);
    toast.success("Post sent.");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const getExplorePosts = createAsyncThunk(
  "post/getExplorePosts",
  async () => {
    const posts = [];
    const postRef = collection(db, "posts");
    try {
      const q = query(postRef, orderBy("date", "desc"));
      const snapshot = await getDoc(q);
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        console.log(posts);
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);
