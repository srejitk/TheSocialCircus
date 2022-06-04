import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ openModal, setOpenModal, children }) => {
  return ReactDOM.createPortal(
    openModal ? (
      <div className="fixed top-32 left-1/2 w-4/5 -translate-x-1/2 -translate-y-0">
        {children}
      </div>
    ) : null,
    document.getElementById("portal")
  );
};
