import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const ContactCard = ({ id }) => {
  const { user, token, allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const otherUser = allUsers?.find((user) => user?.id === id);

  const isFollowing = user?.following?.some((ID) => ID === findUserID);
  return (
    <div className="flex justify-start outline">
      <div className="h-16 w-16">
        <img
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1654684870/The%20Social%20Circus/Avatars/Untitled_1_byawaj.png"
          alt="contact dp"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center px-4">
        <p className="text-base font-semibold">Sreejith</p>
        <p className=" text-sm font-semibold">username</p>
      </div>
      <div>
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
            className="my-3 ml-auto rounded-3xl bg-blue-500 py-3  px-10 font-semibold text-white"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
