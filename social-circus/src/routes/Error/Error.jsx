import React from "react";
import { NavLink } from "react-router-dom";
import { errorCover } from "../../config/Constants";

export const Error = () => {
  return (
    <div className="content relative flex w-screen items-start justify-center md:w-[calc(100vw-11rem)] lg:w-[calc(100vw-18.5rem)]">
      <div className="flex h-96 w-96 flex-col rounded-full bg-blue-600 pb-5 align-top">
        <img src={errorCover} alt="error cover" />
        <span className="text-5xl font-black text-blue-700">Error 404.</span>
        <h1 className="mt-4 text-5xl font-black">Uh-Oh. Page not found.</h1>
        <NavLink
          to="/"
          className="my-3 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-transparent bg-blue-700 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
};
