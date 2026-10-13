"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "./client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isMockUser: boolean;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMockUser, setIsMockUser] = useState<boolean>(false);

  useEffect(() => {
    // Check if demo user was saved in localStorage
    const savedDemo = localStorage.getItem("decscv_demo_user");
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUser(parsed as unknown as User);
        setIsMockUser(true);
        setLoading(false);
        return;
      } catch {
        // ignore
      }
    }

    if (!auth || !(auth as any).onAuthStateChanged) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsMockUser(false);
      } else if (!isMockUser) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isMockUser]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Google sign in error:", err);
      // If Firebase auth is not configured in local environment, provide seamless demo login fallback
      if (err?.code === "auth/configuration-not-found" || err?.code === "auth/invalid-api-key") {
        loginAsDemoUser();
        return;
      }
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      if (err?.code === "auth/invalid-api-key" || err?.code === "auth/configuration-not-found") {
        loginAsDemoUser();
        return;
      }
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      if (err?.code === "auth/invalid-api-key" || err?.code === "auth/configuration-not-found") {
        loginAsDemoUser();
        return;
      }
      throw err;
    }
  };

  const loginAsDemoUser = () => {
    const mock = {
      uid: "demo_uid_indian_builder",
      email: "priya.sharma@example.com",
      displayName: "Priya Sharma",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    } as unknown as User;
    localStorage.setItem("decscv_demo_user", JSON.stringify(mock));
    setUser(mock);
    setIsMockUser(true);
    setLoading(false);
  };

  const logout = async () => {
    localStorage.removeItem("decscv_demo_user");
    setIsMockUser(false);
    if (auth && (auth as any).signOut) {
      await fbSignOut(auth);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        isMockUser,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
