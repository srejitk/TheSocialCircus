import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ openModal, setOpenModal, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50" onClick={(e) => setOpenModal(false)}>
      <div className="fixed inset-0 bg-slate-500/50"></div>
      {openModal ? (
        <div
          className=" fixed top-1/2 left-1/2  w-[30rem] -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </div>,
    document.getElementById("portal")
  );
};
