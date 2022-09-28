import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="sm:content relative flex h-fit min-h-screen w-full flex-col justify-center bg-white py-[10rem] md:absolute  md:flex-col md:py-[10rem] lg:absolute lg:flex-row lg:items-center lg:py-0">
      <div className="flex h-full w-full flex-col items-center justify-center  lg:w-3/5">
        <h2 className=" w-2/3 text-left text-6xl font-black lg:px-4 ">
          Forget the social network, we've got the{" "}
          <span className="mt-3 bg-gradient-to-r from-green-300        via-yellow-300 to-pink-300 bg-clip-text text-transparent">
            {" "}
            Social Circus
          </span>
          .{" "}
        </h2>

        <h2 className="mt-4 w-2/3 text-left text-2xl font-semibold lg:px-4 ">
          We are the circus and your attention is our show.{" "}
        </h2>
        <Link
          to="/login"
          className="align-left items-left flex w-2/3 gap-2 pt-6 text-6xl font-black text-blue-700 transition-[gap] hover:gap-8"
        >
          Try for free <p>{">"}</p>
        </Link>
      </div>
      <div className="img mt-20 w-full overflow-hidden rounded-2xl px-4 md:mx-auto md:h-[40rem] md:w-[40rem] lg:h-[40rem] lg:w-[40rem] lg:p-8">
        <video
          loop={true}
          autoPlay={true}
          className="w-full rounded-xl"
          src="https://res.cloudinary.com/dkqrmlxlg/video/upload/v1656623194/The%20Social%20Circus/Videos/Graphic-Design-Trends-2020-3D-style-and-animation-example-1_zsznev.mp4"
        />
      </div>
      <h className="absolute left-10 -z-10 w-1/2 text-left text-9xl font-black text-slate-50">
        WELCOME TO THE CIRCUS
      </h>
    </div>
  );
};
