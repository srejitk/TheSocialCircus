import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { logout } from "../../redux/slice/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  return (
    <header className="col-span-3">
      <div className="header  flex h-24 w-full flex-row items-center justify-between border-2 p-5 shadow-sm outline">
        <div className="flex justify-center text-center align-middle">
          <h1 className="text-3xl font-semibold ">The Social Circus</h1>
        </div>
        <div className="flex justify-evenly gap-1 align-middle">
          {auth.currentUser?.uid === token ? (
            <button
              className="m-4 flex items-center justify-evenly gap-2 rounded-xl bg-transparent px-5 py-2 font-semibold  hover:bg-gray-100"
              onClick={(e) => dispatch(logout())}
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};
