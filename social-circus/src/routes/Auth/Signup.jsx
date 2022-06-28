import React, { useEffect } from "react";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { brand } from "../../config/Constants";
export const Signup = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div className="content col-span-3 flex h-screen w-full">
      <Link to="/">
        <button className="absolute m-4 flex items-center justify-evenly gap-2 rounded-3xl bg-gray-100 px-5 py-2 font-semibold hover:bg-gray-300">
          <FiChevronLeft /> Back to the Circus
        </button>
      </Link>
      <div className="flex h-screen flex-col items-center justify-center  sm:w-full md:w-full lg:w-full">
        <SignupForm />
      </div>
    </div>
  );
};
