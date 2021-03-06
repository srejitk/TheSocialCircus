import React, { useEffect } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { brand } from "../../config/Constants";

export const Login = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div className="content relative flex h-screen w-full">
      <Link to="/feed">
        <button className="absolute m-4 flex items-center justify-evenly gap-2 rounded-3xl bg-gray-100 px-5 py-2 font-semibold hover:bg-gray-300">
          <FiChevronLeft /> Back to the Circus
        </button>
      </Link>
      <div className="flex h-screen w-full flex-col items-center justify-center  md:w-full lg:w-1/2">
        <LoginForm />
      </div>

      <div className="relative hidden h-full w-0 overflow-hidden break-all bg-blue-600 md:hidden md:w-0 lg:block lg:w-1/2">
        <h1 className="absolute top-4 z-10 text-8xl font-black text-blue-700/40">
          Hello, there
        </h1>
        <h1 className="absolute top-32 z-10  text-9xl font-black text-blue-700/40">
          Come join
        </h1>
        <h1 className="absolute left-10 top-32 z-10  text-9xl font-black text-white/80">
          login.
        </h1>
        <h1 className=" absolute top-60 text-[11rem] font-black text-blue-700/70">
          The Cir
        </h1>
        <h1 className=" absolute  bottom-10 left-0 text-[13rem] font-black text-blue-700/40">
          Circus
        </h1>
        <img
          className="absolute top-44 left-0 z-10 w-[40rem] translate-x-0"
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1654816994/The%20Social%20Circus/Login-rafiki_1_i0m7yf.png"
          alt="Signup Banner"
        />
        <div className="absolute right-10 top-4 z-10 flex h-28 w-28 items-center justify-center rounded-full bg-blue-600">
          <img src={brand} className="w-20" alt="Brand Logo of Social Circus" />
        </div>
      </div>
    </div>
  );
};
