import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { brand } from "../../config/Constants";
import { logout } from "../../redux/slice/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header className="header fixed z-40  w-screen bg-white md:w-screen lg:w-screen ">
      <div className=" flex h-24  flex-row items-center justify-between border-2 p-5 pl-10 shadow-sm">
        <div className="flex items-center justify-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <img
              src={brand}
              className="w-10"
              alt="Brand Logo of Social Circus"
            />
          </div>

          <h1 className="text-3xl font-semibold ">
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
