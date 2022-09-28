import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  MdBookmarkBorder,
  MdBookmark,
  MdArchive,
  MdOutlineArchive,
  MdArrowDropDown,
} from "react-icons/md";
import {
  FiChevronDown,
  FiChevronUp,
  FiCornerDownLeft,
  FiEdit,
  FiHeart,
  FiMessageSquare,
  FiTrash,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  ArchivePost,
  BookmarkPost,
  DeleteComment,
  DeletePost,
  DislikePost,
  LikePost,
  PostComment,
  RestorePost,
  UndoBookmarkPost,
} from "../../redux/actions/postActions";
import { setPost } from "../../redux/slice/postSlice";
import { EditPostModal } from "../EditPostModal/EditPostModal";
import { defaultAvatar } from "../../config/Constants";

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
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const { user, allUsers } = useSelector((state) => state.auth);
  const token = localStorage.getItem("userID");
  const { id, uid, imageUrl, content, displayName, date, likes, comments } =
    post;
  const handleComment = async (e) => {
    e.preventDefault();
    await PostComment(id, comment, dispatch);
    setComment(defaultComment);
    setShowComments(true);
    setShowCommentEditor(false);
  };

  const deleteCommentHandler = async (e, comment) => {
    await DeleteComment(id, comment, dispatch);
  };
  const diff = new Date(date).getMinutes() - new Date().getMinutes();

  const isBookmarked = user?.bookmarks?.some((bookmark) => bookmark?.id === id);

  const isArchived = user?.archive?.some((archive) => archive?.id === id);

  const { pathname } = useLocation();

  const isAuthor = post?.uid === token;
  const isLiked = likes?.find((user) => user?.userID === token);
  return (

    <div className="my-3 mx-auto flex h-fit w-full flex-col justify-around rounded-lg border-2 border-gray-200 bg-white shadow-sm">
      <Link
        to={`/profile/${post?.uid}`}
        className="flex items-center justify-start"
      >
        <img
          src={
            allUsers?.find((user) => user.id === uid)?.data?.avatar ||
            defaultAvatar
          }
          alt="dp"
          className="m-3 h-12 w-12 rounded-full"
        />

        <div className="flex flex-col items-start px-1 ">
          {" "}
          <h1 className="text-xl font-semibold">{displayName}</h1>
          <h1 className="ml-auto pr-4 font-medium text-slate-400">{date}</h1>
        </div>
      </Link>

      {isAuthor && (
        <div className="absolute top-4 right-4 ml-auto flex flex-col items-end">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex h-10 w-10 justify-center rounded-md  border-2 bg-white bg-opacity-20 text-sm font-medium text-slate-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <MdArrowDropDown
                  className=" h-full w-full p-2 text-slate-700 hover:text-slate-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {isAuthor && pathname !== "/saved" && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenModal((prev) => !prev);
                            dispatch(setPost(post));
                          }}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center justify-start gap-6 rounded-md px-2 py-2 text-sm`}
                        >
                          <FiEdit />
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  {isAuthor && pathname !== "/saved" && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => DeletePost(id, dispatch)}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center justify-start gap-6 rounded-md px-2 py-2 text-sm`}
                        >
                          <FiTrash />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
                <div className="px-1 py-1">
                  {post?.uid === token && isArchived && isAuthor && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => RestorePost(post, token, dispatch)}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center justify-start gap-6 rounded-md px-2 py-2 text-sm`}
                        >
                          <MdArchive />
                          Restore
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  {post?.uid === token && !isArchived && isAuthor && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            ArchivePost(post, token, dispatch);
                          }}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center justify-start gap-6 rounded-md px-2 py-2 text-sm`}
                        >
                          <MdOutlineArchive />
                          Archive
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="break-all px-3 text-left text-2xl">{content}</h1>

        {imageUrl !== "" && (
          <div className="h-72 rounded-md  p-4">
            <img
              src={imageUrl}
              alt="post-cover"
              className="mx-auto max-h-[450px] w-fit max-w-full rounded-lg object-contain"
            />
          </div>
        )}
        <div className="mx-2 mt-4 flex items-center -space-x-1 overflow-hidden">
          {isLiked ? (
            likes?.length > 1 ? (
              <div className="flex -space-x-1 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={likes[0]?.avatar || defaultAvatar}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={user?.avatar || defaultAvatar}
                />
              </div>
            ) : (
              <div className="flex -space-x-1 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={user?.avatar || defaultAvatar}
                />
              </div>
            )
          ) : likes?.length > 1 && likes?.length < 3 ? (
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={likes[0]?.avatar || defaultAvatar}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={likes[1]?.avatar || defaultAvatar}
              />
            </div>
          ) : likes?.length > 3 ? (
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={likes[0]?.avatar || defaultAvatar}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={likes[1]?.avatar || defaultAvatar}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={likes[2]?.avatar || defaultAvatar}
              />
            </div>
          ) : null}

          <p className="px-3 font-medium text-slate-700">
            {isLiked
              ? likes?.length > 1
                ? `You and ${likes?.length - 1} others liked this`
                : "You liked this"
              : likes?.length > 1
              ? `${likes[0]?.displayName} & ${
                  likes?.length - 1
                } other liked this`
              : likes?.length
              ? `${likes[0]?.displayName} liked this`
              : "Be the first one to like this"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 md:justify-start lg:justify-start">
        <div className="flex items-center">
          {" "}
          <button
            className={`m-3 flex h-10 w-10 items-center justify-center rounded-full border-2  border-transparent hover:bg-red-50 
          hover:text-red-500`}
            onClick={(e) => {
              likes?.find((user) => user?.userID === token)
                ? DislikePost(id, token, user, dispatch)
                : LikePost(id, token, user, dispatch);
            }}
          >
            {likes?.find((user) => user?.userID === token) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FiHeart />
            )}
          </button>
          <p>{comments?.length >= 1 ? likes?.length : ""}</p>
        </div>
        <div className="flex items-center">
          <button
            className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
            onClick={(e) => {
              setShowCommentEditor((prev) => !prev);
            }}
          >
            <FiMessageSquare />
          </button>
          <p>{likes?.length >= 1 ? likes?.length : ""}</p>
        </div>

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
        {comments.length > 0 && (
          <button
            className="m-3 h-10 w-10 rounded-full px-3 hover:bg-blue-50"
            onClick={(e) => {
              setShowComments((prev) => !prev);
            }}
          >
            {showComments ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>
      {openModal && (
        <EditPostModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {showCommentEditor && (
        <form
          onSubmit={(e) => handleComment(e)}
          className="flex h-36 items-center justify-between border-t-2 border-gray-200 "
        >
          <div>
            <img
              src={user?.avatar || defaultAvatar}
              alt=""
              className="m-3 h-10  w-10 rounded-full"
            />
          </div>
          <textarea
            type="text"
            name="newPost"
            rows="5"
            value={comment.content}
            onChange={(e) => {
              setComment({
                ...comment,
                content: e.target.value,
                userID: token,
                displayName: user?.displayName,
                avatar: user?.avatar || defaultAvatar,
                username: user?.username,
                date: new Date().toLocaleString(),
              });
            }}
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
      )}
      {showComments && (
        <div className="h-fit max-h-[20rem] w-full overflow-y-scroll">
          {comments?.map((comment) => (
            <div
              className="relative mx-auto flex w-[95%] flex-col items-start"
              key={comment.date}
            >
              <div className="my-2 flex h-fit min-h-[7rem] w-full items-center justify-start rounded-md border-2 border-slate-200 pb-3">
                <Link to={`/profile/${comment.userID}`}>
                  <img
                    src={comment?.avatar}
                    alt="Commenter Avatar"
                    className="m-3 h-10 w-10 flex-grow rounded-full"
                  />
                </Link>
                <div className="mx-6 flex flex-grow flex-col items-start justify-center">
                  <Link to={`/profile/${comment.username}`}>
                    {" "}
                    <div className="mb-4">
                      {" "}
                      <p
                        className=" mx-1 flex h-fit w-full items-center rounded-sm px-3  text-left
        font-medium text-gray-500   "
                      >
                        {comment?.displayName}
                      </p>
                      <p className="item-start flex h-full px-4 font-medium text-slate-400">
                        {comment.date}
                      </p>
                    </div>
                  </Link>
                  <p
                    className=" min-h-10 mx-1 flex h-fit w-[70%] flex-wrap items-center 
        text-ellipsis break-all rounded-sm px-3 pb-6 text-left text-xl font-normal "
                  >
                    {comment?.content}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {token === comment.userID ? (
                  <button
                    onClick={(e) => deleteCommentHandler(e, comment)}
                    className=" flex h-10 w-10 items-center justify-center rounded-md outline outline-transparent hover:bg-red-50 hover:text-red-500 hover:outline-red-200"
                  >
                    <FiTrash />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
