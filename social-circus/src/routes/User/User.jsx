import React, { Fragment, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../../redux/slice/authSlice";
import { Tab } from "@headlessui/react";
import { ContactCard, PostCard } from "../../components";
import { followUser, unfollowUser } from "../../redux/actions/followActions";
import { defaultAvatar, defaultCover } from "../../config/Constants";
import { FiEdit } from "react-icons/fi";

export const User = () => {
  const { allUsers, otherUser, user, token } = useSelector(
    (state) => state.auth
  );

  const { userID } = useParams();
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();

  const findUser = allUsers?.find((user) => user?.id === userID);

  dispatch(setOtherUser(findUser));
  const data = otherUser?.data;

  const userPosts = posts.filter((post) => post?.data?.id === findUser?.id);

  const isFollowing = user?.following?.some((ID) => ID === findUser?.id);
  return (
    <div className="content h-screen w-full">
      <div className="relative h-60 w-full bg-gray-50">
        <img
          src={data?.cover || defaultCover}
          alt="cover"
          className={` 
           absolute top-0 h-fit max-h-80 w-full object-cover`}
        />

        <img
          src={data?.avatar || defaultAvatar}
          alt="dp"
          className={`
          absolute left-16 -bottom-4 z-10 h-28 w-28 translate-y-1/2 rounded-lg`}
        />
        <div className="absolute -bottom-40 left-1/2 h-80 w-full -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center  rounded-lg bg-gray-50 p-20 shadow-xl">
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
              className="align-center group absolute top-8 right-8 my-3 flex justify-between  rounded-3xl border-2 border-transparent bg-blue-700 p-4 px-10 py-3 font-bold text-white hover:border-blue-700/90 hover:bg-blue-700/90 hover:outline-2"
            >
              <FiEdit className="relative mx-3 mt-1 h-full " />
              <p className=" group-hover:hidden">Following</p>
              <p className="hidden group-hover:block">Unfollow</p>
            </button>
          ) : (
            <button
              onClick={(e) =>
                followUser(
                  user,
                  otherUser?.data,
                  otherUser?.id,
                  token,
                  dispatch
                )
              }
              className="align-center group absolute top-8 right-8 my-3 flex justify-between  rounded-3xl border-2 border-transparent bg-blue-700 p-4 px-10 py-3 font-bold text-white hover:border-blue-700/90 hover:bg-blue-700/90 hover:outline-2"
            >
              <FiEdit className="relative mx-3 mt-1 h-full " />
              Follow
            </button>
          )}

          <h1 className="text-black-300 text-left text-2xl font-medium ">
            {data?.displayName || "Joker"}
          </h1>
          <h1 className="w-full pt-2 text-left text-lg font-medium text-gray-400 ">
            {`@${data?.username || "joker"}`}
          </h1>
          <p className="mx-auto w-full pt-2 text-left text-xl font-semibold">
            {data?.bio || "We're Hiring!"}
          </p>
          <div className="flex w-full">
            {" "}
            <a
              href={data?.website || "https://www.jointhecircus.com"}
              target="_blank"
              className="w-full py-1 text-left font-semibold text-blue-500"
            >
              {data?.website || "https://www.jointhecircus.com"}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className=" text-4xl font-black">
                {data?.following?.length || 0}
              </p>
              <p className="font-semibold text-gray-500">Following</p>
            </div>
            <div>
              <p className=" text-4xl font-black">
                {data?.followers?.length || 0}
              </p>
              <p className="font-semibold text-gray-500">Followers</p>
            </div>
            <div>
              <p className=" text-4xl font-black">{userPosts?.length}</p>
              <p className="font-semibold text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-80 w-full bg-gray-100 px-2 pb-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-600 px-4  py-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  Feed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  Followers
                </button>
              )}
            </Tab>{" "}
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  Following
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 h-full bg-gray-100">
            <Tab.Panel
              as="div"
              className="h-full rounded-xl bg-gray-50 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {userPosts?.length === 0 ? (
                "No Posts here"
              ) : (
                <div>
                  {userPosts?.map((post) => {
                    return <PostCard key={post.id} post={post} />;
                  })}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {data?.followers?.length === 0 ? (
                "No Followers yet"
              ) : (
                <div>
                  {data?.followers?.map((id) => {
                    return <ContactCard key={id} id={id} />;
                  })}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {data?.following?.length === 0 ? (
                "Not Following anyone yet"
              ) : (
                <div>
                  {data?.following?.map((id) => {
                    return <ContactCard key={id} id={id} />;
                  })}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
