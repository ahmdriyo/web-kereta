"use client"

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig"; // Pastikan untuk mengimpor objek autentikasi Firebase Anda
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [peran, setPeran] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(currentUser)
        const userDoc = await getDoc(doc(firestore, "pengguna", user.uid));
        if (userDoc.exists()) {
          setPeran(userDoc.data().peran);
        }
        console.log("perrran",peran)
      } else {
        setCurrentUser(null);
        setPeran(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, peran }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
