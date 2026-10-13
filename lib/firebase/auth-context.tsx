"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  onAuthStateChanged,
  browserPopupRedirectResolver,
  deleteUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "./client";
import { Profile } from "@/lib/types";
import { slugifyName } from "@/lib/username";
import { DefaultSections } from "@/lib/schema";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  setProfile: (p: Profile | null) => void;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  saveProfileToFirestore: (profileData: Profile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync / fetch profile from Firestore for the authenticated user
  const fetchUserProfile = async (currentUser: User): Promise<Profile | null> => {
    try {
      if (!db || !(db as any).type) {
        return null;
      }

      // 1. Try querying profile by user UID
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("uid", "==", currentUser.uid));
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        const docData = querySnap.docs[0].data() as Profile;
        setProfile(docData);
        return docData;
      }

      // 2. Check draft in localStorage if it matches
      if (typeof window !== "undefined") {
        const localDraft = localStorage.getItem(`decscv_profile_${currentUser.uid}`);
        if (localDraft) {
          const parsed = JSON.parse(localDraft);
          setProfile(parsed);
          return parsed;
        }
      }

      // 3. Brand new user: initialize clean profile with user's real Google details (NO dummy data!)
      const initialUsername =
        slugifyName(currentUser.displayName || "") ||
        currentUser.email?.split("@")[0] ||
        "user-" + Math.floor(1000 + Math.random() * 9000);

      const freshProfile: Profile = {
        uid: currentUser.uid,
        username: initialUsername,
        schemaVersion: 1,
        mode: "portfolio",
        portfolio: {
          style: "bento",
          accent: "#6E44FF",
          fontPair: 0,
          colorMode: "light",
          motion: "full",
        },
        resume: {
          template: "modern",
          accent: "#6E44FF",
          scale: "M",
          showPhoto: !!currentUser.photoURL,
        },
        basics: {
          name: currentUser.displayName || "",
          headline: "",
          email: currentUser.email || "",
          photo: currentUser.photoURL ? { url: currentUser.photoURL } : undefined,
          availableForWork: true,
          links: [],
        },
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        achievements: [],
        certifications: [],
        sections: DefaultSections,
        seo: {
          title: currentUser.displayName ? `${currentUser.displayName} — Portfolio & Resume` : undefined,
        },
        visibility: "draft",
        stats: { views: 0 },
      };

      setProfile(freshProfile);
      return freshProfile;
    } catch (err) {
      console.warn("Could not fetch user profile from Firestore:", err);
      return null;
    }
  };

  useEffect(() => {
    if (!auth || !(auth as any).onAuthStateChanged) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Save/update user doc in Firestore
        try {
          if (db && (db as any).type) {
            await setDoc(
              doc(db, "users", firebaseUser.uid),
              {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                lastSeenAt: new Date().toISOString(),
              },
              { merge: true }
            );
          }
        } catch {
          // ignore if offline
        }
        await fetchUserProfile(firebaseUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    if (!auth) throw new Error("Firebase Auth is not initialized.");
    try {
      const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
      const loggedUser = result.user;
      setUser(loggedUser);
      await fetchUserProfile(loggedUser);
      return loggedUser;
    } catch (err: any) {
      // If popup is blocked by browser, fallback to redirect
      if (err?.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      console.error("Google Sign-In failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    if (auth && (auth as any).signOut) {
      await fbSignOut(auth);
    }
    setUser(null);
    setProfile(null);
  };

  const deleteAccount = async (): Promise<void> => {
    const targetUser = user || (auth?.currentUser ?? null);
    const targetUsername = profile?.username;

    // 1. Delete from Firestore
    try {
      if (db && (db as any).type && targetUser) {
        // Delete user account metadata document
        await deleteDoc(doc(db, "users", targetUser.uid));

        // Delete user's public profile document
        if (targetUsername) {
          await deleteDoc(doc(db, "profiles", targetUsername));
        }

        // Clean up any remaining documents matching this UID
        const profilesRef = collection(db, "profiles");
        const q = query(profilesRef, where("uid", "==", targetUser.uid));
        const querySnap = await getDocs(q);
        for (const snapDoc of querySnap.docs) {
          await deleteDoc(snapDoc.ref);
        }
      }
    } catch (err) {
      console.warn("Firestore documents deletion note:", err);
    }

    // 2. Clear local storage traces
    if (typeof window !== "undefined") {
      localStorage.removeItem("decscv_draft_profile");
      localStorage.removeItem("decscv_draft");
      if (targetUser) {
        localStorage.removeItem(`decscv_profile_${targetUser.uid}`);
      }
    }

    // 3. Delete Firebase Auth user record
    if (targetUser && typeof (targetUser as any).delete === "function") {
      try {
        await deleteUser(targetUser);
      } catch (err: any) {
        if (err?.code === "auth/requires-recent-login") {
          throw new Error("Security verification expired. Please sign out, log in again, and retry account deletion.");
        }
        throw err;
      }
    }

    setUser(null);
    setProfile(null);
  };

  const saveProfileToFirestore = async (profileData: Profile) => {
    setProfile(profileData);

    // Save to local storage for instant offline access
    if (typeof window !== "undefined" && user?.uid) {
      localStorage.setItem(`decscv_profile_${user.uid}`, JSON.stringify(profileData));
      localStorage.setItem("decscv_draft_profile", JSON.stringify(profileData));
    }

    // Save directly to Firestore under profiles collection
    if (db && (db as any).type && profileData.username) {
      try {
        await setDoc(doc(db, "profiles", profileData.username), {
          ...profileData,
          uid: user?.uid || profileData.uid,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.error("Firestore profile save error:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profile,
        setProfile,
        signInWithGoogle,
        logout,
        deleteAccount,
        saveProfileToFirestore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
