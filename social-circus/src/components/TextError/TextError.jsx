import React from "react";

export const TextError = ({ children }) => {
  return (
    <div className="error text-red-500 font-semibold text-sm">{children}</div>
  );
};
