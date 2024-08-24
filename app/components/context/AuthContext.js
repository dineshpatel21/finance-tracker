"use client";
import { createContext, useState, useEffect } from "react";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = { user, loading, googleLoginHandler, logout };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
