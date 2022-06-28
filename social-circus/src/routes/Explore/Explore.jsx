import React, { Fragment } from "react";
import { PostCard, SuggestionBar } from "../../components";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

export const Explore = () => {
  const { posts } = useSelector((state) => state.post);
  const { user, token } = useSelector((state) => state.auth);
  const followingUsers = user?.following;
  const homeposts = posts?.filter(
    (post) => followingUsers?.includes(post?.uid) || post?.uid === token
  );

  const trendingposts = [...posts].sort(
    (a, b) => b.likes?.length - a.likes?.length
  );

  const Oldestposts = [...posts].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="content flex w-screen md:w-[calc(100vw-11rem)] lg:w-[calc(100vw-18.5rem)]">
      <div className="w-full px-1 pb-16 pt-8 sm:px-0  md:w-full md:px-5 md:pt-2 lg:w-3/5 lg:px-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-t-lg bg-gray-50 px-4 py-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none    ${
                    selected
                      ? "bg-white shadow"
                      : "text-black hover:bg-gray-200/10 hover:text-black"
                  }`}
                >
                  Explore
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none    ${
                    selected
                      ? "bg-white shadow"
                      : "text-black hover:bg-gray-200/10 hover:text-black"
                  }`}
                >
                  Trending
                </button>
              )}
            </Tab>{" "}
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none    ${
                    selected
                      ? "bg-white shadow"
                      : "text-black hover:bg-gray-200/10 hover:text-black"
                  }`}
                >
                  Oldest
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                {posts?.map((post) => {
                  return <PostCard key={post?.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                {trendingposts?.map((post) => {
                  return <PostCard key={post?.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                {Oldestposts?.map((post) => {
                  return <PostCard key={post?.id} post={post} />;
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
