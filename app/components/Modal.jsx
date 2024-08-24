import React from "react";

const Modal = ({ show, setShow, children }) => {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-[100vh] z-10 transition-all duration-500"
    >
      <div className="container flex flex-col mx-auto max-w-2xl h-[80vh] rounded-2xl bg-slate-800 py-6 px-6">
        <button
          onClick={() => setShow(false)}
          className="w-10 h-10 font-bold rounded-full bg-slate-500"
        >
          X
        </button>
        <div className="py-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
