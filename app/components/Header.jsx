"use client";
import { useContext } from "react";
import Image from "next/image";

//importing image
import profile from "../../public/assets/images/profile.png";

//importing icons
import { ImStatsBars } from "react-icons/im";

//context
import { authContext } from "./context/AuthContext";

export default function Header() {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/*Left Side User Information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* profile img */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* profile name */}
            <small>{user.displayName}</small>
          </div>
        )}

        {/* right side  */}
        {user && !loading && (
          <nav className="flex items-center gap-2">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
