import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiInbox } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { defaultAvatar } from "../../config/Constants";
import { useSelector } from "react-redux";
import { brand2 } from "../../config/Constants";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (

    <nav className="sidebar fixed bottom-0 z-30 flex h-fit w-full  flex-row justify-center gap-2 border-t-2 bg-white md:fixed md:h-full md:w-44 md:flex-col md:justify-start md:border-r-2 md:pt-28 lg:h-full lg:w-72 lg:flex-col  ">
      <div className="flex h-20 w-full justify-evenly md:w-full md:flex-col md:px-4 md:pt-36">
        <NavLink to="/home" className="my-2 ">
          <div
            className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly
            "
          >
            <FiHome className="z-10 flex h-6 w-6" />
            <p
              className="z-10 hidden font-semibold md:block md:text-black lg:block
            lg:w-20"
            >
              Home
            </p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Home
            </h2>

          </div>
        </NavLink>

        <NavLink to="/explore" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10  md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <MdExplore className="z-10 flex h-6 w-6" />

            <p className="z-10 hidden font-semibold   lg:block">Explore</p>

          </div>
        </NavLink>
        <NavLink to="/saved" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10  md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <FiInbox className="z-10 flex h-6 w-6" />

            <p className="z-10 hidden font-semibold   lg:block">Saved</p>

          </div>
        </NavLink>
        <NavLink to="/profile" className="my-2 mb-auto">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10  md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <FiUser className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold   lg:block">Profile</p>
          </div>
        </NavLink>
        <NavLink
          to="/profile"
          className="relative hidden h-14 rounded-full  lg:my-8 lg:flex lg:w-full lg:items-center lg:justify-start"
        >
          <img
            src={user?.avatar || defaultAvatar}
            alt="user dp"
            className="z-10 mx-auto h-12 w-12 rounded-full"
          />
          <div className="flex h-full w-full flex-col items-start md:w-full lg:w-1/2">
            <h2 className="z-10 hidden px-2 text-center text-lg font-bold text-black lg:block">
              {user?.firstname}
            </h2>
            <h2 className="z-10 hidden px-2 text-center text-base font-semibold text-gray-700 lg:block">
              @{user?.username}

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
