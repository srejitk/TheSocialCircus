import React from "react";
import { FiUserCheck, FiUserPlus, FiUserX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar } from "../../config/Constants";
import { followUser, unfollowUser } from "../../redux/actions/followActions";

export const ContactCard = ({ id }) => {
  const { user, token, allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const otherUser = allUsers?.find((user) => user?.id === id);
  const isFollowing = user?.following?.some((ID) => ID === id);
  return (
    <div className=" mb-4 flex justify-between border-b-2">
      <div className="m-3 h-16 w-16">
        <img
          src={otherUser?.data?.avatar || defaultAvatar}
          alt="contact dp"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-grow flex-col items-center justify-start pl-4">
        <p className="flex w-full flex-grow items-center text-left text-base font-semibold">
          {otherUser?.data?.displayName}
        </p>
        <p className="my-auto flex w-full flex-grow items-start text-left text-base font-semibold text-gray-500">
          {otherUser?.data?.username === "username"
            ? " @" + otherUser?.data?.firstname.toLowerCase()
            : otherUser?.data?.username}
        </p>
      </div>
      <div className="w-fit pr-4">
        {isFollowing ? (
          <button
            onClick={(e) =>
              unfollowUser(
                user,
                otherUser?.data,
                otherUser?.id,
                token,
                dispatch
              )
            }
            className="my-3 ml-auto rounded-full border-2 border-blue-600 bg-blue-50 py-3 px-10  font-semibold text-blue-600 hover:bg-blue-600/50"
          >
            <FiUserCheck className="text-blue-600" />
          </button>
        ) : (
          <button
            onClick={(e) =>
              followUser(user, otherUser?.data, otherUser?.id, token, dispatch)
            }
            className="my-3 ml-auto rounded-3xl bg-blue-500 py-3 px-10  font-semibold text-white hover:bg-blue-600"
          >
            <FiUserPlus className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
