import { createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext=createContext(null)
const auth =getAuth(app)
const googleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }

      const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

      const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

      useEffect( ()=>{
        const unScribe=onAuthStateChanged(auth,currentUser =>{
            // console.log('user login',currentUser)
            setUser(currentUser)
            setLoading(false)
            
        })
        return ()=>{
            unScribe()
        }
    },[])
   

    const authInfo={
                   user,
                   loading,
                   signInWithGoogle,
                   updateUserProfile,
                   signOutUser
               }
    return (

       
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;