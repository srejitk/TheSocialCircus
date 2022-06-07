import React, { Fragment, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../../redux/slice/authSlice";
import { Tab } from "@headlessui/react";
import { PostCard } from "../../components";
import { followUser, unfollowUser } from "../../redux/actions/followActions";

export const User = () => {
  const { allUsers, otherUser, user, token } = useSelector(
    (state) => state.auth
  );
  const { userName } = useParams();
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const data = otherUser?.data;
  const findUserID = allUsers?.find(
    (user) => user?.data?.username === userName
  )?.id;

  const findUser = allUsers?.find((user) => user?.id === findUserID);

  dispatch(setOtherUser(findUser));

  const userPosts = posts.filter((post) => post?.data?.id === findUserID);

  const isFollowing = user?.following?.some((user) => user?.id === findUserID);
  return (
    <div className="content h-screen w-full outline">
      <div className="relative h-60 w-full">
        <img
          src={data?.cover}
          alt="cover"
          className="absolute top-0 h-fit max-h-80 w-full object-cover"
        />

        <img
          src={data?.avatar}
          alt="dp"
          className="absolute left-1/2 -bottom-8 z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-lg"
        />

        <div className="absolute -bottom-48 left-1/2 h-80 w-11/12 -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center  rounded-lg bg-gray-50 p-20 shadow-xl">
          <h1 className="text-black-300 text-2xl font-medium ">
            {data?.displayName}
          </h1>
          <h1 className="mx-auto text-lg font-medium text-gray-400 ">
            {`@${data?.username}`}
          </h1>
          <p className="mx-auto w-full px-8 pt-4">{data?.bio}</p>

          <p className="mx-auto w-full px-8 py-1 font-semibold text-blue-500">
            {data?.website}
          </p>
          <div className="flex items-center justify-between">
            <div>{data?.following?.length} Following</div>
            <div>{data?.followers?.length} Followers</div>
          </div>
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
              className="group my-3 mx-auto flex w-5/12 items-center justify-center rounded-3xl bg-blue-500 px-20  py-3 font-semibold text-white"
            >
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
              className="my-3 rounded-3xl bg-blue-500 px-20  py-3 font-semibold text-white"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="w-fullpx-2 relative mx-auto mt-80 py-16 outline sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-600 px-4 py-2">
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
          <Tab.Panels className="mt-2">
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
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
                  {data?.followers?.map((post) => {
                    return <PostCard key={post.id} post={post} />;
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
                  {data?.following?.map((post) => {
                    return <PostCard key={post.id} post={post} />;
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
