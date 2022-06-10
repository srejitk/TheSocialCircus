import React, { Fragment, useEffect } from "react";
import { CreatePost, PostCard, SuggestionBar } from "../../components";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

export const Saved = () => {
  const { posts } = useSelector((state) => state.post);
  const { user, token } = useSelector((state) => state.auth);
  let homeposts = [];

  useEffect(() => {
    homeposts = posts?.filter((post) => post.id === token);
  }, [posts]);

  return (
    <div className="flex md:col-span-3 md:ml-44 lg:ml-64">
      <div className="w-full px-1 pb-16 pt-8 sm:px-0 md:px-2 md:pt-2 lg:px-16">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-t-lg bg-blue-600 px-4 py-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  Bookmarks
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
                  Archive
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
                <CreatePost />
                {user?.bookmarks?.map((post) => {
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
                {user?.archive?.map((post) => {
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
