import React, { Fragment, useEffect } from "react";
import { CreatePost, PostCard, SuggestionBar } from "../../components";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { posts } = useSelector((state) => state.post);
  const { user, token } = useSelector((state) => state.auth);
  const followingUsers = user?.following;
  const homeposts = posts?.filter(
    (post) => followingUsers?.includes(post?.uid) || post?.uid === token
  );

  const mediaposts = [...homeposts].filter((post) => post?.imageUrl !== "");

  const textposts = [...homeposts].filter((post) => post?.imageUrl === "");

  return (
    <div className="content flex w-screen  md:w-[calc(100vw-11rem)] lg:w-[calc(100vw-18rem)]">
      <div className="w-full pb-16 pt-8 sm:px-0  md:w-full  lg:w-3/5 lg:pt-0">
        <Tab.Group>
          <Tab.List className="flex  bg-gray-200/50 py-1 px-1">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? " bg-blue-600/90 text-white shadow"
                      : "text-gray-600/70 hover:bg-white/[0.12] hover:text-gray-700"
                  }`}
                >
                  Feed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? " bg-blue-600/90 text-white shadow"
                      : "text-gray-600/70 hover:bg-white/[0.12] hover:text-gray-700"
                  }`}
                >
                  Media Only
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? " bg-blue-600/90 text-white shadow"
                      : "text-gray-600/70 hover:bg-white/[0.12] hover:text-gray-700"
                  }`}
                >
                  Text Only
                </button>
              )}
            </Tab>{" "}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                <CreatePost />
                {homeposts?.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                <CreatePost />
                {mediaposts?.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                <CreatePost />
                {textposts?.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <SuggestionBar />
    </div>
  );
};
