import React from "react";
import { useSelector } from "react-redux";
import { ContactCard } from "../ContactCard/ContactCard";

export const SuggestionBar = () => {
  const { allUsers, token } = useSelector((state) => state.auth);

  const otherUsers = allUsers?.filter((eachUser) => eachUser.id !== token);

  return (
    <div className=" hidden h-80 shadow-sm md:hidden lg:ml-6 lg:mt-4 lg:mr-auto lg:block lg:h-80 lg:w-[350px] lg:max-w-[30rem] lg:overflow-y-scroll">
      <h2 className=" text-md rounded-t-lg border-2  border-b-2 border-gray-200 bg-gray-50 px-3 py-4 text-left text-2xl font-bold text-black">
        Who to follow
      </h2>
      <div className=" overflow-y-scroll">
        {" "}
        {otherUsers?.map((user) => (
          <ContactCard key={user?.id} id={user?.id} />
        ))}
      </div>
    </div>
  );
};
