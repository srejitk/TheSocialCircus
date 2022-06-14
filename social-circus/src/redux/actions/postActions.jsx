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
import { defaultAvatar } from "../../config/Constants";
import { db } from "../../firebase";
import { postLoading, setPost } from "../slice/postSlice";
import { getUserData } from "./authActions";

export const AddPost = async (post, dispatch) => {
  const postRef = collection(db, "posts");
  try {
    const loading = toast.loading("Uploading Post...");
    const newPost = await addDoc(postRef, post);
    setDoc(doc(postRef, newPost?.id), { id: newPost?.id }, { merge: true });
    dispatch(setPost({ ...post, id: newPost?.id }));
    dispatch(getExplorePosts());
    toast.success("Post Uploaded", { id: loading });
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
        posts?.push(doc.data());
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
    const loading = toast.loading("Updating Post...");
    await setDoc(
      doc(db, "posts", id),
      {
        content: form?.content,
      },
      { merge: true }
    );
    toast.success("Post Updated", { id: loading });
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
    const loading = toast.loading("Deleting Post...");
    await deleteDoc(doc(db, "posts", id));
    dispatch(getExplorePosts());
    toast.success("Post Deleted", { id: loading });
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
        avatar: user?.avatar || defaultAvatar,
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
        avatar: user?.avatar || defaultAvatar,
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

export const BookmarkPost = async (post, token, dispatch) => {
  try {
    const userRef = doc(db, "users", token);
    await setDoc(
      userRef,
      {
        bookmarks: arrayUnion(post),
      },
      { merge: true }
    );
    dispatch(getUserData(token));
    dispatch(getExplorePosts());
    toast.success("Bookmarked Post");
  } catch (error) {
    console.log(error);
    toast.error("Couldn't bookmark post");
  }
};
export const UndoBookmarkPost = async (post, token, dispatch) => {
  try {
    const userRef = doc(db, "users", token);
    await setDoc(
      userRef,
      {
        bookmarks: arrayRemove(post),
      },
      { merge: true }
    );
    dispatch(getUserData(token));
    dispatch(getExplorePosts());
  } catch (error) {
    console.log(error);
    toast.error("Couldn't remove bookmark");
  }
};

export const ArchivePost = async (post, token, dispatch) => {
  try {
    const userRef = doc(db, "users", token);
    const postRef = collection(db, "posts");
    await setDoc(
      userRef,
      {
        archive: arrayUnion(post),
      },
      { merge: true }
    );
    await deleteDoc(doc(postRef, post?.id));
    dispatch(getUserData(token));
    dispatch(getExplorePosts());
  } catch (error) {
    console.log(error);
    toast.error("Couldn't archive post");
  }
};

export const RestorePost = async (post, token, dispatch) => {
  try {
    const userRef = doc(db, "users", token);
    const postRef = collection(db, "posts");
    await setDoc(
      userRef,
      {
        archive: arrayRemove(post),
      },
      { merge: true }
    );
    await setDoc(doc(postRef, post?.id), post, { merge: true });
    dispatch(setPost(post));
    dispatch(getExplorePosts());
    dispatch(getUserData(token));
  } catch (error) {
    console.log(error);
    toast.error("Couldn't restore post");
  }
};
