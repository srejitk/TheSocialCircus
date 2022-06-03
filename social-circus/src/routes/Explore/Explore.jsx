import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components";

export const Explore = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <div>
      {posts?.length}
      {posts.map((post) => {
        return <PostCard post={post} />;
      })}
    </div>
  );
};
