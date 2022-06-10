import React from "react";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
export const Signup = () => {
  return (
    <div className="flex h-screen w-full">
      <Link to="/feed">
        <button className="absolute m-4 flex items-center justify-evenly gap-2 rounded-3xl bg-gray-100 px-5 py-2 font-semibold hover:bg-gray-300">
          <FiChevronLeft /> Back to the Circus
        </button>
      </Link>
      <div className="flex h-screen flex-col items-center justify-center outline sm:w-full md:w-full lg:w-1/2">
        <SignupForm />
      </div>

      <div className="h-full sm:hidden sm:w-0 md:hidden md:w-0 lg:block lg:w-1/2">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="Banner Picture of Area-51"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
