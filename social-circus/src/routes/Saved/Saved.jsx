import React, { Fragment, useEffect } from "react";
import { PostCard, SuggestionBar } from "../../components";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

export const Saved = () => {
  const { posts } = useSelector((state) => state.post);
  const { user, token } = useSelector((state) => state.auth);
  let homeposts;
  useEffect(() => {
    homeposts = posts?.filter((post) => post?.id === token);
  }, [posts]);

  return (

    <div className="content flex w-screen  md:ml-24 md:w-[calc(100vw-7rem)]  lg:w-[calc(100vw-365px)] lg:border-2 lg:pt-0">
      <div className="w-full px-1  pb-16  pt-8  sm:px-0 md:w-full lg:w-3/5 lg:max-w-[600px]  lg:pt-0">
        <Tab.Group>
          <Tab.List className="flex bg-white">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex h-14 w-full   items-center justify-center text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 hover:bg-gray-400/20 focus:outline-none focus:ring-2 ${
                    selected
                      ? " bg-white font-bold text-black"
                      : "font-semibold text-gray-600/70 "

                  }`}
                >
                  <p
                    className={`flex h-full w-fit flex-col justify-center border-b-4 ${
                      selected ? "border-blue-600" : "border-transparent"
                    }  px-4 text-center`}
                  >
                    Bookmarks
                  </p>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button

                  className={`flex h-14 w-full   items-center justify-center text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 hover:bg-gray-400/20 focus:outline-none focus:ring-2 ${
                    selected
                      ? " bg-white font-bold text-black"
                      : "font-semibold text-gray-600/70 "

                  }`}
                >
                  <p
                    className={`flex h-full w-fit flex-col justify-center border-b-4 ${
                      selected ? "border-blue-600" : "border-transparent"
                    }  px-4 text-center`}
                  >
                    Archive
                  </p>
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
                {user?.bookmarks?.map((post) => {
                  return <PostCard key={post?.id} post={post} />;
                })}
              </div>
            </Tab.Panel>
            <Tab.Panel
              as="div"
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <div>
                {user?.archive?.map((post) => {
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
