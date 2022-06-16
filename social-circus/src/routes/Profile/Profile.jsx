import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { ContactCard, PostCard, SuggestionBar } from "../../components";
import {
  defaultAvatar,
  defaultBio,
  defaultCover,
  defaultPortfolio,
} from "../../config/Constants";
import { MdVerified } from "react-icons/md";

export const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const token = localStorage.getItem("userID");
  const defaultUsername = user?.email?.split("@")[0];

  const { username, bio, portfolio, avatar, cover } = user;

  const verificationCheck = () => {
    return username !== defaultUsername ||
      bio !== defaultBio ||
      portfolio !== defaultPortfolio ||
      avatar !== defaultAvatar ||
      cover !== defaultCover
      ? true
      : false;
  };

  const userPosts = posts?.filter((post) => post?.uid === token);
  return (
    <div className="content flex w-screen md:w-[calc(100vw-11rem)] lg:w-[calc(100vw-18.5rem)] ">
      <div className="w-full px-1 pb-16 pt-8 sm:px-0  md:w-full md:px-5 md:pt-2 lg:w-3/5 lg:px-6">
        {" "}
        <div className="relative h-60 w-full bg-gray-50">
          <img
            src={user?.cover || defaultCover}
            alt="cover"
            className={` ${
              isLoading ? "animate-pulse" : ""
            } absolute top-0 h-fit max-h-80 w-full object-cover`}
          />

          <img
            src={user?.avatar || defaultAvatar}
            alt="dp"
            className={`${
              isLoading ? "animate-pulse" : ""
            }absolute left-16 -bottom-4 z-10 h-28 w-28 translate-y-1/2 rounded-lg`}
          />
          <div className="absolute -bottom-40 left-1/2 h-80 w-full -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center  rounded-lg bg-gray-50 p-20 shadow-xl">
            <Link
              to="/update"
              className="align-center group absolute top-8 right-8 my-3 flex justify-between  rounded-3xl border-2 border-transparent bg-blue-700 p-4 px-10 py-3 font-bold text-white hover:border-blue-700/90 hover:bg-blue-700/90 hover:outline-2"
            >
              <FiEdit className="relative mx-3 mt-1 h-full " />
              <p>Edit Profile</p>
            </Link>

            <h1 className="text-black-300 flex items-center gap-2 text-left text-2xl font-medium ">
              {user?.displayName}
              {verificationCheck() ? (
                <MdVerified className="text-blue-600" />
              ) : null}
            </h1>
            <h1 className="w-full pt-2 text-left text-lg font-medium text-gray-400 ">
              {`@${user?.username || defaultUsername}`}
            </h1>
            <p
              className={`mx-auto w-full pt-2 text-left text-xl font-semibold ${
                user?.bio ? "" : "text-slate-400"
              }`}
            >
              {user?.bio || defaultBio}
            </p>
            <div className="flex w-full">
              {" "}
              <a
                href={user?.website || "https://www.thesocialcircus.vercel.app"}
                target="_blank"
                className="w-full py-1 text-left font-semibold text-blue-500"
              >
                {user?.website || defaultPortfolio}
              </a>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className=" text-4xl font-black">
                  {user?.following?.length || 0}
                </p>
                <p className="font-semibold text-gray-500">Following</p>
              </div>
              <div>
                <p className=" text-4xl font-black">
                  {user?.followers?.length || 0}
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
            <Tab.Panels className="mt-2 bg-gray-100">
              <Tab.Panel
                as="div"
                className="rounded-xl bg-gray-50 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                {userPosts?.length === 0 ? (
                  "No Posts here"
                ) : (
                  <div>
                    {userPosts?.map((post) => {
                      return <PostCard key={post?.id} post={post} />;
                    })}
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel
                as="div"
                className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                {user?.followers?.length === 0 ? (
                  "No Followers yet"
                ) : (
                  <div>
                    {user?.followers?.map((id) => {
                      return <ContactCard key={id} id={id} />;
                    })}
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel
                as="div"
                className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                {user?.following?.length === 0 ? (
                  "Not Following anyone yet"
                ) : (
                  <div>
                    {user?.following?.map((id) => {
                      return <ContactCard key={id} id={id} />;
                    })}
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <SuggestionBar />
    </div>
  );
};
