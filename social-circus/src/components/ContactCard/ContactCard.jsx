import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar } from "../../config/Constants";

export const ContactCard = ({ id }) => {
  const { user, token, allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const otherUser = allUsers?.find((user) => user?.id === id);

  const { data } = otherUser;
  const isFollowing = user?.following?.some((ID) => ID === id);
  return (
    <div className="mb-4 flex justify-between border-b-2">
      <div className="h-16 w-16">
        <img
          src={data?.avatar || defaultAvatar}
          alt="contact dp"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-grow flex-col items-center justify-start pl-4">
        <p className="flex w-full flex-grow items-center text-left text-base font-semibold">
          {data?.displayName}
        </p>
        <p className="my-auto flex w-full flex-grow items-start text-left text-base font-semibold text-gray-500">
          {data?.username === "username"
            ? " @" + data?.firstname.toLowerCase()
            : data?.username}
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
            className="outline-red group my-3 mx-auto flex w-10 items-center justify-center rounded-3xl bg-blue-500 px-10  py-3 font-semibold text-white"
          >
            <p className=" group-hover:hidden">Following</p>
            <p className="hidden group-hover:block">Unfollow</p>
          </button>
        ) : (
          <button
            onClick={(e) =>
              followUser(user, otherUser?.data, otherUser?.id, token, dispatch)
            }
            className="my-3 ml-auto rounded-3xl bg-blue-500 py-3 px-10  font-semibold text-white hover:bg-blue-600"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
