import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiEdit, FiHeart, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePost,
  DislikePost,
  LikePost,
} from "../../redux/actions/postActions";
import { setPost } from "../../redux/slice/postSlice";
import { PostModal } from "../PostModal/PostModal";

export const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const { data } = post;
  console.log(data);
  const { likes } = data;
  const { imageUrl, content, displayName, date } = data;
  return (
    <div className="m-3 flex h-72 w-full flex-col justify-around rounded-lg shadow-md">
      <div className="flex items-center justify-start">
        <img
          src="https://bestprofilepictures.com/wp-content/uploads/2021/06/Zenitsu-Profile-Image-1005x1024.jpg"
          alt="dp"
          className="m-3 h-16 w-16 rounded-full"
        />

        <div className="flex flex-col items-start px-3">
          {" "}
          <h1 className="text-xl">{displayName}</h1>
          <h1>{date}</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="px-3 text-left text-2xl">{content}</h1>

        {imageUrl !== "" && <img src={imageUrl} alt="post-cover" />}
      </div>
      <div className="flex justify-start">
        <button
          className={`} m-3 flex h-10 w-10 items-center justify-center rounded-full border-2  border-transparent hover:bg-red-50 
          hover:text-red-500`}
          onClick={(e) => {
            likes?.find((user) => user?.userID === token)
              ? DislikePost(post?.id, token, user, dispatch)
              : LikePost(post?.id, token, user, dispatch);
          }}
        >
          {likes?.find((user) => user?.userID === token) ? (
            <FiHeart />
          ) : (
            <FaHeart className="text-red-500" />
          )}
        </button>
        <button
          className="m-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent  hover:bg-red-50 hover:text-red-500"
          onClick={(e) => dispatch(DeletePost(post?.id, dispatch))}
        >
          <FiTrash />
        </button>
        <button
          className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
          onClick={(e) => {
            dispatch(setPost(post));
            setOpenModal((prev) => !prev);
          }}
        >
          <FiEdit />
        </button>
      </div>

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
