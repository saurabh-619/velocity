import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
// Will throw 500 error if not imported
import "firebase/auth";
import { createUser } from "./db";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);

      createUser(user.uid, user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
 
  const signInWithGithub = () => { 
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        handleUser(res.user);
        return res.user;
      });
  };

  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        handleUser(res.user);
        return res.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        handleUser(false);
      }
    });

    //   Runs when component unmounts
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGoogle,
    signInWithGithub,
    signout,
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
