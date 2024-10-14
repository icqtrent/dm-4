"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
  	signInWithPopup,
	signInAnonymously,
	sendEmailVerification
} from 'firebase/auth';
import { auth } from '@/app/firebase';
//import { auth } from '../config/firebase.config';



// User data type interface
interface UserType {
	email: string | null;
	
	uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Define the constants for the user and loading state
	const [user, setUser] = useState<UserType>({ email: null, uid: null });
	const [loading, setLoading] = useState<Boolean>(true);
	

	// Update the state depending on auth
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					email: user.email,
					uid: user.uid,
				});
			} else {
				setUser({ email: null, uid: null });
			}
		});

		setLoading(false);

		return () => unsubscribe();
	}, []);

	// Sign up the user
	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
		
	};



	// Login the user
	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Logout the user
	const logOut = async () => {
		setUser({ email: null, uid: null });
		return await signOut(auth);
	};

	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	  };
	  
	const loginAnonymously = () => {
		return signInAnonymously(auth);
	};

	

	// Wrap the children with the context provider
	return (
		<AuthContext.Provider value={{ user, signUp, logIn, logOut, loginWithGoogle, loginAnonymously  }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
