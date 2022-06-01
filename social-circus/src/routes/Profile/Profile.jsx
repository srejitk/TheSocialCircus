import React from "react";

export const Profile = () => {
  return (
    <div className="h-screen w-full outline">
      <div className="relative h-60 w-full outline-red-500">
        <img
          src="https://i.pinimg.com/736x/02/01/bd/0201bddb9707cf682149db1dc8e959ad.jpg"
          alt="cover"
          className="absolute top-0 h-fit max-h-80 w-full object-cover outline"
        />

        <img
          src="https://64.media.tumblr.com/75320ca1fcab8631c111abca8bf055a4/fdcf9f0f117edd2e-7b/s250x250_c1/2a81402340070baae8e3eae599d3916facc19fe1.png"
          alt="dp"
          className="absolute left-1/2 -bottom-8 z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-lg"
        />
        <div className="absolute -bottom-48 left-1/2 h-80 w-11/12 -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center  rounded-lg bg-gray-50 p-20 shadow-xl">
          <h1 className="text-black-300 text-2xl font-medium ">
            Zenitsu Agatsume
          </h1>
          <h1 className="mx-auto text-lg font-medium text-gray-400 ">
            @zenitsu
          </h1>
          <p className="mx-auto w-full px-8 pt-4">
            my bio. That's my existence .
          </p>

          <p className="mx-auto w-full px-8 py-1 font-semibold text-blue-500">
            thunderclap.com
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
