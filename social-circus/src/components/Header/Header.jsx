import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header className="header w-screen md:ml-24 md:w-[calc(100vw-7rem)] md:pl-4 lg:ml-0 lg:w-[calc(100vw-24rem)] lg:pl-0 ">
      <div className=" flex h-24  flex-row items-center justify-between lg:pl-24 ">
        <div className="flex items-center justify-center gap-6 text-center">
          <h1 className="pl-4 text-3xl font-semibold lg:pl-2 ">
            The <span className="font-bold text-blue-600">Social</span> Circus
          </h1>
        </div>
        <div className="flex justify-evenly gap-1 align-middle">
          <button
            className="m-4 flex h-16 w-16 items-center justify-evenly gap-2 rounded-xl bg-transparent px-5 py-2 font-semibold  hover:bg-gray-100"
            onClick={(e) => {
              dispatch(logout());
              navigate("login");
            }}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};
