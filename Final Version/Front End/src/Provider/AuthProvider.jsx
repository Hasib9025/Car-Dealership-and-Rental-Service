import { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    // const [userName, setUserName] = useState('');
    // const [userPhoto, setUserPhoto] = useState('');
    const [loading, setLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (newName, newPhoto) =>{
        setLoading(true);
        // updateProfile(createdUser, {
        //     displayName: name,
        //     photoURL: photo,
        // });
        return updateProfile(auth.currentUser, {
            displayName: newName , photoURL: newPhoto,
          })
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
          try {
            setLoading(true);
    
            if (loggedUser) {
              setUser(loggedUser);
              localStorage.setItem('login', 'true'); // Set login to true in local storage
            } else {
              setUser(null);
              localStorage.setItem('login', 'false'); // Set login to false in local storage
            }
          } catch (error) {
            console.error("Error during authentication:", error);
          } finally {
            setLoading(false);
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
      
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const gitSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, gitProvider);
    }

    

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        gitSignIn,
        logOut,
        updateUser,
        setLoading,
        setUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;