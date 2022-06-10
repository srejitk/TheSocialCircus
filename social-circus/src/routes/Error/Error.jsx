import React from "react";
import { NavLink } from "react-router-dom";
import { errorCover } from "../../config/Constants";

export const Error = () => {
  return (
    <div className="content relative flex w-screen items-start justify-center md:w-[calc(100vw-11rem)] lg:w-[calc(100vw-18rem)]">
      <div className="flex h-96 w-96 flex-col rounded-full bg-blue-600 pb-5 align-top">
        <img src={errorCover} alt="error cover" />
        <h1 className="mt-4 text-5xl font-black">
          Yeh <span className="text-8xl text-blue-700">kahaan</span> aagaye
          hum?!?
        </h1>
        <NavLink to="/feed" className="mt-5 px-5 py-4 font-bold">
          Go Home
        </NavLink>
      </div>
    </div>
  );
};
