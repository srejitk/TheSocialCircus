import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiInbox } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { defaultAvatar } from "../../config/Constants";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="sidebar fixed bottom-0 z-30 flex h-fit w-full  flex-row justify-center gap-2 border-t-2 bg-white md:fixed md:h-screen md:w-44 md:flex-col md:justify-start md:border-r-2 md:pt-28 lg:h-screen lg:w-72 lg:flex-col  ">
      <div className="flex h-20 w-full justify-evenly md:w-full md:flex-col md:px-4 md:pt-36">
        <div className="h-18 relative hidden flex-col rounded-3xl bg-blue-600 shadow-sm md:flex md:h-fit md:w-36 lg:w-full">
          <img
            src={user?.avatar || defaultAvatar}
            alt="user dp"
            className="z-10 mx-auto mt-3 h-16 w-16 rounded-full"
          />
          <h2 className="absolute px-1 pt-2 text-center text-8xl font-black text-blue-700/90 lg:hidden">
            Hii
          </h2>
          <h2 className="absolute hidden px-1 pt-2 text-center text-8xl font-black text-blue-700/90 lg:block">
            Hello
          </h2>
          <h2 className="z-10 px-2 py-2 text-center text-xl font-semibold text-white">
            {user?.firstname}
          </h2>
        </div>

        <NavLink to="/feed" className="my-2 ">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly  ">
            <FiHome className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">Home</p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Home
            </h2>
          </div>
        </NavLink>

        <NavLink to="/explore" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly  ">
            <MdExplore className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Explore
            </p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Explore
            </h2>
          </div>
        </NavLink>
        <NavLink to="/saved" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly  ">
            <FiInbox className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Saved
            </p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Saved
            </h2>
          </div>
        </NavLink>
        <NavLink to="/profile" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly  ">
            <FiUser className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Profile
            </p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Profile
            </h2>
          </div>
        </NavLink>
      </div>
      <div className="mt-auto hidden w-full font-semibold text-gray-700 lg:block">
        <p>
          &#169; Made by <span className=" text-gray-400">Sreejith K</span>
        </p>
      </div>
    </nav>
  );
};
