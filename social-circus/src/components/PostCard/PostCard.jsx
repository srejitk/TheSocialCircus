import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  MdBookmarkBorder,
  MdBookmark,
  MdArchive,
  MdOutlineArchive,
} from "react-icons/md";
import {
  FiCornerDownLeft,
  FiEdit,
  FiHeart,
  FiMessageSquare,
  FiTrash,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArchivePost,
  BookmarkPost,
  DeleteComment,
  DeletePost,
  DislikePost,
  getExplorePosts,
  LikePost,
  PostComment,
  RestorePost,
  UndoBookmarkPost,
} from "../../redux/actions/postActions";
import { setPost } from "../../redux/slice/postSlice";
import { PostModal } from "../PostModal/PostModal";

const defaultComment = {
  content: "",
  displayName: "",
  avatar: "",
  date: "",
};
export const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState(defaultComment);
  const [showComments, setShowComments] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const {
    avatar,
    id,
    username,
    imageUrl,
    content,
    displayName,
    date,
    likes,
    comments,
  } = post;
  const handleComment = async (e) => {
    e.preventDefault();
    await PostComment(id, comment, dispatch);
    setComment(defaultComment);
  };

  const deleteCommentHandler = async (e, comment) => {
    await DeleteComment(id, comment, dispatch);
  };
  //TODO - GET POSTED TIME
  const diff = new Date(date).getHours() - new Date().getHours();

  const isBookmarked = user?.bookmarks?.some((bookmark) => bookmark?.id === id);

  const isArchived = user?.archive?.some((archive) => archive?.id === id);

  return (
    <div className="m-3 flex h-fit w-full flex-col justify-around rounded-lg shadow-md">
      <div className="flex items-center justify-start">
        <img src={avatar} alt="dp" className="m-3 h-16 w-16 rounded-full" />

        <div className="flex flex-col items-start px-3">
          {" "}
          <h1 className="text-xl">{displayName}</h1>
          <h1>{username}</h1>
          <h1>{date}</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="px-3 text-left text-2xl">{content}</h1>

        {imageUrl !== "" && (
          <div className="rounded-md  p-4">
            <img
              src={imageUrl}
              alt="post-cover"
              className="h-full w-full rounded-lg"
            />
          </div>
        )}
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
            <FaHeart className="text-red-500" />
          ) : (
            <FiHeart />
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
        <button
          className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
          onClick={(e) => {
            dispatch(setPost(post));
            setShowComments((prev) => !prev);
          }}
        >
          <FiMessageSquare />
        </button>
        {isBookmarked ? (
          <button
            className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
            onClick={(e) => UndoBookmarkPost(post, token, dispatch)}
          >
            <MdBookmark />
          </button>
        ) : (
          <button
            className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
            onClick={(e) => BookmarkPost(post, token, dispatch)}
          >
            <MdBookmarkBorder />
          </button>
        )}
        <button
          className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
          onClick={(e) => RestorePost(post, token, dispatch)}
        >
          <MdArchive />
        </button>
        <button
          className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
          onClick={(e) => {
            ArchivePost(post, token, dispatch);
            dispatch(getExplorePosts());
          }}
        >
          <MdOutlineArchive />
        </button>
      </div>
      <form
        onSubmit={(e) => handleComment(e)}
        className="flex h-36 items-center justify-between border-t-2 border-gray-200 "
      >
        <div>
          <img
            src={user?.avatar}
            alt=""
            className="m-3 h-10  w-10 rounded-full"
          />
        </div>
        <textarea
          type="text"
          name="newPost"
          rows="5"
          value={comment.content}
          onChange={(e) =>
            setComment({
              ...comment,
              content: e.target.value,
              userID: token,
              displayName: user?.displayName,
              avatar: user?.avatar,
              username: user?.username,
              date: new Date().toLocaleString(),
            })
          }
          placeholder="Have any thoughts on this?"
          className=" mx-6 w-full resize-none whitespace-normal break-words  rounded-sm border-2 border-gray-50 bg-gray-50 px-3 focus:bg-gray-50 focus:outline-none"
        />
        <button
          type="submit"
          className="mx-6 rounded-full bg-blue-500 p-3 font-semibold text-white "
        >
          <FiCornerDownLeft />
        </button>
      </form>
      {comments?.map((comment) => (
        <div className="flex w-full flex-col items-start" key={comment.date}>
          <div className="flex h-fit min-h-[7rem] w-full items-center justify-start border-b-2 border-t-2 border-slate-200 pb-3">
            <Link to={`/profile/${comment.username}`}>
              <img
                src={comment?.avatar}
                alt="Commenter Avatar"
                className="m-3 h-10 w-10 flex-grow rounded-full"
              />
            </Link>
            <div className="mx-6 flex flex-grow flex-col items-start justify-center">
              <Link to={`/profile/${comment.username}`}>
                {" "}
                <p
                  className=" mx-1 flex h-8 w-full  flex-wrap items-center rounded-sm  px-3
        text-left font-medium text-gray-500  "
                >
                  {comment?.displayName}
                </p>
              </Link>
              <p
                className=" min-h-8 mx-1 flex h-fit w-[70%] flex-wrap items-center text-ellipsis 
        break-all rounded-sm px-3 text-left font-semibold "
              >
                {comment?.content}
              </p>
            </div>
            <p className="item-start flex h-full py-6 px-6 font-semibold text-gray-400">
              {comment.date}
            </p>
          </div>
          <div>
            {token === comment.userID ? (
              <button
                onClick={(e) => deleteCommentHandler(e, comment)}
                className="m-3 flex h-10 w-32 items-center justify-center rounded-sm outline outline-transparent hover:bg-red-50 hover:text-red-500 hover:outline-red-200"
              >
                <FiTrash />
              </button>
            ) : null}
          </div>
        </div>
      ))}

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
