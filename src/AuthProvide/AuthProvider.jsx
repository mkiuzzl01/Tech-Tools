import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../firebase.config/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Store } from "react-notifications-component";


// import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark,setDark] = useState(false);
  const axiosPublic = useAxiosPublic();
  

  const registerUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const logInUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
 
  const logOut = () => {
    setUser(null);
    return signOut(auth);
  };
  const profileUpdate = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const successToast = (text) => {
    return Store.addNotification({
      title: "Congratulation",
      message:text,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
      
    })
  };

  const errorToast = (text) => {
    return Store.addNotification({
      title: "Sorry",
      message:text,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
      
    })
  };
  const warningToast = (text) => {
    return Store.addNotification({
      title: "Warning",
      message:text,
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
      
    })
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email:currentUser.email};
        try {
         const {data} =  await axiosPublic.post('/jwt',userInfo);
          // console.log(data);
          localStorage.setItem('Token',data.token);
        } catch (error) {
          console.log(error.message);
        }

      }else{
        localStorage.removeItem('Token')
      }
      setLoading(false);


    return () => {
      unsubscribe();
    };
  });

  }, [user?.email,axiosPublic]);

  // console.log('auth',loading);
  const shareTools = {
    user,
    loading,
    dark,
    setLoading,
    setDark,
    setUser,
    registerUser,
    logInUser,
    logInWithGoogle,
    logOut,
    profileUpdate,
    successToast,
    errorToast,
    warningToast,
  };
  return (
    <AuthContext.Provider value={shareTools}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
