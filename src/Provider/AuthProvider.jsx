import { createContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
   

    const authInfo={
                   user,
                   loading,
                   signInWithGoogle
               }
    return (

       
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;