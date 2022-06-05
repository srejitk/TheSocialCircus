import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { postLoading, setPost } from "../slice/postSlice";

export const AddPost = async (post, dispatch) => {
  const postRef = collection(db, "posts");
  try {
    await addDoc(postRef, post);
    dispatch(setPost(post));
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
      const postSnapshot = await getDocs(q);
      postSnapshot.forEach((doc) => {
        posts.push({ data: doc.data(), id: doc.id });
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const EditPost = async (form, dispatch, id) => {
  dispatch(postLoading(true));
  try {
    await updateDoc(doc(db, "posts", id), form);
    dispatch(getExplorePosts());
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    dispatch(postLoading(false));
  }
};

export const DeletePost = async (id, dispatch) => {
  try {
    await deleteDoc(doc(db, "posts", id));
    dispatch(getExplorePosts());
  } catch (error) {
    console.log(error);
    toast.error("Error : Couldn't delete post");
  }
};

export const LikePost = async (postID, token, user, dispatch) => {
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: arrayUnion({
        userID: token,
        displayName: user?.displayName,
        avatar: "",
      }),
    });
    dispatch(getExplorePosts());
  } catch (error) {
    toast.error("Couldn't like post");
    console.log(error.message);
  }
};

export const DislikePost = async (postID, token, user, dispatch) => {
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: arrayRemove({
        userID: token,
        displayName: user?.displayName,
        avatar: "",
      }),
    });
    dispatch(getExplorePosts());
  } catch (error) {
    toast.error("Couldn't dislike post");
    console.log(error.message);
  }
};

export const PostComment = async (postID, comment, dispatch) => {
  dispatch(postLoading(true));
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
    dispatch(getExplorePosts());
  } catch (error) {
    toast.error("Error : Couldn't post your comment.");
    console.log(error);
  } finally {
    dispatch(postLoading(false));
  }
};

export const DeleteComment = async (postID, comment, dispatch) => {
  console.log(comment.commentID);
  dispatch(postLoading(true));
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      comments: arrayRemove(comment),
    });
    dispatch(getExplorePosts());
  } catch (error) {
    toast.error("Error : Couldn't post your comment.");
    console.log(error);
  } finally {
    dispatch(postLoading(false));
  }
};
