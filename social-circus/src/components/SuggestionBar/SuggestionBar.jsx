import React from "react";
import { useSelector } from "react-redux";
import { ContactCard } from "../ContactCard/ContactCard";

export const SuggestionBar = () => {
  const { allUsers, token } = useSelector((state) => state.auth);

  const otherUsers = allUsers?.filter((eachUser) => eachUser.id !== token);

  return (
    <div className="hidden h-80 shadow-md md:hidden lg:mr-10 lg:mt-2 lg:block lg:h-[calc(100vh-9rem)] lg:w-2/3 lg:max-w-[30rem] lg:overflow-y-scroll lg:rounded-lg">
      <h2 className=" text-md rounded-t-lg border-b-2 bg-blue-600 px-3 py-4 text-left font-semibold text-white">
        Suggestions
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
