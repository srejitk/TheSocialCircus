import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ openModal, setOpenModal, children }) => {
  return ReactDOM.createPortal(
    openModal ? (
      <div className=" fixed top-1/2 left-1/2 z-30 w-full -translate-x-1/2 translate-y-1/2  ">
        {children}
      </div>
    ) : null,
    document.getElementById("portal")
  );
};
