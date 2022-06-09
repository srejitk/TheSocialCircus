import React from "react";
import { useSelector } from "react-redux";
import { ContactCard } from "../ContactCard/ContactCard";

export const SuggestionBar = () => {
  const { allUsers } = useSelector((state) => state.auth);

  return (
    <div className="hidden h-80 rounded-md  outline md:block lg:block lg:w-96 ">
      <h2 className=" border-b-2 px-3 py-4 text-left text-2xl font-semibold">
        Suggestions
      </h2>
      <div className=" overflow-y-scroll">
        {" "}
        {allUsers?.map((user) => (
          <ContactCard key={user?.id} id={user?.id} />
        ))}
      </div>
    </div>
  );
};
