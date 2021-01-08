import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import "firebase/auth";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signInWithGithub = (email, password) => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        return res.user;
      });
  };

  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        return res.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthChanged ran");
      if (user) {
        setUser(user);
      } else {
        setUser(false);
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

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
