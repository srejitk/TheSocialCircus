import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DeletePost } from "../../redux/actions/postActions";
import { setPost } from "../../redux/slice/postSlice";
import { PostModal } from "../PostModal/PostModal";

export const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  console.log(post);
  return (
    <div className="h-fit w-full outline">
      <h1>{post?.data.content}</h1>\ (
      <img src={post?.data.imageUrl} alt="post cover" />)
      <button onClick={(e) => dispatch(DeletePost(post?.id, dispatch))}>
        Delete
      </button>
      <button
        onClick={(e) => {
          dispatch(setPost(post));
          setOpenModal((prev) => !prev);
        }}
      >
        Edit
      </button>
      {openModal && (
        <PostModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          edit={true}
        />
      )}
    </div>
  );
};
