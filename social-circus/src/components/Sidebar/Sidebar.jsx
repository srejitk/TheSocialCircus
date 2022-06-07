import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCoffee, FiUser, FiUsers } from "react-icons/fi";

export const Sidebar = () => {
  return (
    <nav className="sidebar bottom-0 flex h-fit w-full flex-row justify-center gap-2 bg-white dark:bg-gray-900 md:h-screen md:flex-col md:justify-start lg:h-screen lg:w-72 lg:flex-col ">
      <div className="hidden text-3xl font-semibold md:block md:pt-7 lg:pt-7">
        Area-51
      </div>
      <div className="flex h-20 flex-row md:my-10 md:flex-col lg:my-10 lg:flex-col ">
        <NavLink to="/">
          <div className="flex h-20 w-20 flex-col items-center justify-center gap-4 px-3 py-2 hover:bg-slate-200 hover:brightness-95 md:w-full md:flex-row-reverse  md:justify-end md:px-7 lg:w-full">
            Home
            <FiHome />
          </div>
        </NavLink>

        <NavLink to="explore">
          <div className="flex h-20 w-20 flex-col items-center justify-center gap-4 px-3 py-2 hover:bg-slate-200 hover:brightness-95 md:w-full md:flex-row-reverse  md:justify-end md:px-7 lg:w-full">
            Boomark Probably
            <FiCoffee />
          </div>
        </NavLink>
        <NavLink to="profile">
          <div className="flex h-20 w-20 flex-col items-center justify-center gap-4 px-3 py-2 hover:bg-slate-200 hover:brightness-95 md:w-full md:flex-row-reverse  md:justify-end md:px-7 lg:w-full">
            Profile
            <FiUser />
          </div>
        </NavLink>
      </div>
      <div className="hidden md:static lg:static">Dark Mode</div>
    </nav>
  );
};
