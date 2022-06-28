import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiInbox } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { defaultAvatar } from "../../config/Constants";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="sidebar fixed bottom-0 z-30 flex h-fit w-full  flex-row justify-center gap-2 border-t-2 bg-white md:fixed md:h-full md:w-44 md:flex-col md:justify-start md:border-r-2 md:pt-28 lg:h-full lg:w-72 lg:flex-col  ">
      <div className="flex h-20 w-full justify-evenly md:w-full md:flex-col md:px-4 md:pt-36">
        <NavLink to="/" className="my-2 ">
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
          <div className="relative flex h-16 w-16 items-center justify-center rounded-lg hover:bg-slate-500/10 md:w-full md:justify-evenly  ">
            <MdExplore className="z-10 flex h-6 w-6" />
            <p
              className="z-10 hidden font-semibold md:block 
            md:text-black lg:block lg:w-20"
            >
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
            <p className="z-10 hidden font-semibold md:block md:text-black lg:block lg:w-20">
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
            <p className="z-10 hidden font-semibold md:block md:text-black lg:block lg:w-20">
              Profile
            </p>
            <h2 className="absolute -top-1 hidden px-1 pt-0 text-center text-6xl font-black text-transparent lg:block">
              Profile
            </h2>
          </div>
        </NavLink>
      </div>
      <div className="hidden md:static lg:static">Dark Mode</div>
    </nav>
  );
};
