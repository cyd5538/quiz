"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import userStore from "@/stores/userStore";

export default function AuthStateManager() {
  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return null; 
}