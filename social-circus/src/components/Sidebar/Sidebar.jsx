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
    <nav className="sidebar fixed bottom-0 z-30 flex h-fit w-full flex-row  justify-center gap-2 border-t-2 bg-white md:fixed md:h-screen md:w-44 md:flex-col md:justify-start md:border-r-2 md:pt-28 lg:h-screen lg:w-[23rem] lg:flex-col lg:pt-4">
      <div className="flex h-20 w-full justify-evenly md:w-full md:flex-col md:px-4 md:pt-0 lg:ml-auto lg:mb-auto lg:h-full lg:w-3/4 lg:justify-start lg:pt-4">
        <NavLink to="/feed" className="mb-6 hidden md:block  ">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white  md:w-full  md:justify-evenly lg:h-12 lg:w-12 lg:justify-start  ">
            <img src={brand2} className="z-10 flex h-full w-full" />
          </div>
        </NavLink>

        <NavLink to="/feed" className="my-2 ">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden  rounded-full hover:bg-slate-500/10 md:w-full md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6  ">
            <FiHome className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">Home</p>
          </div>
        </NavLink>

        <NavLink to="/explore" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10 md:w-full md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <MdExplore className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Explore
            </p>
          </div>
        </NavLink>
        <NavLink to="/saved" className="my-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10 md:w-full md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <FiInbox className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Saved
            </p>
          </div>
        </NavLink>
        <NavLink to="/profile" className="my-2 mb-auto">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full hover:bg-slate-500/10 md:w-full md:justify-evenly lg:h-12 lg:w-fit lg:justify-start lg:gap-4 lg:px-6   ">
            <FiUser className="z-10 flex h-6 w-6" />
            <p className="z-10 hidden font-semibold md:block  lg:block">
              Profile
            </p>
          </div>
        </NavLink>
        <NavLink
          to="/profile"
          className="relative hidden h-14 rounded-full md:flex md:h-fit md:w-36 lg:my-8 lg:flex lg:w-full lg:items-center lg:justify-start"
        >
          <img
            src={user?.avatar || defaultAvatar}
            alt="user dp"
            className="z-10 mr-2 h-12 w-12 rounded-full"
          />
          <div className="flex h-full w-1/2 flex-col items-start">
            <h2 className="z-10 px-2 text-center text-lg font-bold text-black">
              {user?.firstname}
            </h2>
            <h2 className="z-10 px-2 text-center text-base font-semibold text-gray-700">
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
