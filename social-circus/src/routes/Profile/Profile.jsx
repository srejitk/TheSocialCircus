import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="content h-screen w-full">
      <div className="relative h-60 w-full outline-red-500">
        <img
          src={user?.cover}
          alt="cover"
          className="absolute top-0 h-fit max-h-80 w-full object-cover"
        />

        <img
          src={user?.avatar}
          alt="dp"
          className="absolute left-1/2 -bottom-8 z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-lg"
        />

        <div className="absolute -bottom-48 left-1/2 h-80 w-11/12 -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center  rounded-lg bg-gray-50 p-20 shadow-xl">
          <Link
            to="/update"
            className={`group absolute top-8 right-8 rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2 
                
              `}
          >
            <FiEdit className="group-hover:font-bold group-hover:text-blue-500 " />
          </Link>
          <h1 className="text-black-300 text-2xl font-medium ">
            {user?.displayName}
          </h1>
          <h1 className="mx-auto text-lg font-medium text-gray-400 ">
            {`@${user?.username}`}
          </h1>
          <p className="mx-auto w-full px-8 pt-4">{user?.bio}</p>

          <p className="mx-auto w-full px-8 py-1 font-semibold text-blue-500">
            {user?.website}
          </p>
          <div className="flex items-center justify-between">
            <div>99 Following</div>
            <div>99 Followers</div>
            <div>Fuji CLAN</div>
          </div>
          <button className="my-3 rounded-3xl bg-blue-500 px-20  py-3 font-semibold text-white">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
