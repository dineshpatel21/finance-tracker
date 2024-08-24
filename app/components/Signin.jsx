import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "./context/AuthContext";

const Signin = () => {
  const { googleLoginHandler } = useContext(authContext);
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 font-bold text-6xl text-center">Welcome </h1>
      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-800 rounded-2xl">
        <div className="h-52">
          {/* <img src="" alt="" className="object-cover w-full h-full" /> */}
        </div>
        <div className="py-4 px-4">
          <h3>Please sign in to continue</h3>
        </div>
        <button
          onClick={googleLoginHandler}
          className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>
      </div>
    </main>
  );
};

export default Signin;
