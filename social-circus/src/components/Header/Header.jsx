import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="header flex h-24 flex-row items-center justify-between border-2 p-5 shadow-sm">
        <div className="flex justify-center text-center align-middle">
          <h1 className="text-3xl font-semibold ">The Social Circus</h1>
        </div>
        <div className="flex justify-evenly gap-1 align-middle">
          <Link to="/login">
            <button className="m-4 flex items-center justify-evenly gap-2 rounded-xl bg-transparent px-5 py-2 font-semibold  hover:bg-gray-100">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className=" m-4 flex items-center justify-evenly gap-2 rounded-xl bg-gray-100 px-5 py-2 font-semibold hover:brightness-90">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
