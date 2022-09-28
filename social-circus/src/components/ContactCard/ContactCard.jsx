import React from "react";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { defaultAvatar } from "../../config/Constants";
import { followUser, unfollowUser } from "../../redux/actions/followActions";

export const ContactCard = ({ id }) => {
  const { user, token, allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const otherUser = allUsers?.find((user) => user?.id === id);
  const isFollowing = user?.following?.some((ID) => ID === id);

  return (
    <div className=" mb-4 flex justify-between border-b-2">
      <Link to={`/profile/${otherUser?.id}`} className="m-3 h-12 w-12">
        <img
          src={otherUser?.data?.avatar || defaultAvatar}
          alt="contact dp"
          className="rounded-full"
        />
      </Link>
      <div className="flex flex-grow flex-col items-center justify-start">
        <Link
          to={`/profile/${otherUser?.id}`}
          className="flex w-full flex-grow items-center text-left text-base font-semibold"
        >
          {otherUser?.data?.displayName}
        </Link>
        <p className="my-auto flex w-full flex-grow items-start text-left text-base font-medium text-gray-500">
          {otherUser?.data?.username === "username"
            ? " @" + otherUser?.data?.toLowerCase()
            : otherUser?.data?.username}
        </p>
      </div>
      <div className="w-fit pr-4">
        {isFollowing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              unfollowUser(
                user,
                otherUser?.data,
                otherUser?.id,
                token,
                dispatch
              );
            }}
            className="my-3 ml-auto rounded-full border-2 border-blue-600 bg-blue-50 py-3 px-3  font-semibold text-blue-600 hover:bg-blue-600/50"
          >
            <FiUserCheck className="text-blue-600" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              followUser(user, otherUser?.data, otherUser?.id, token, dispatch);
            }}
            className="my-3 ml-auto rounded-3xl bg-blue-500 py-3 px-3  font-semibold text-white hover:bg-blue-600"
          >
            <FiUserPlus className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
