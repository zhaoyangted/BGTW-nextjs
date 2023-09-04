//import {useAuth} from "./useAuth"
import React, { createContext, useContext,useState } from "react"
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import axios from "axios"
import { useAuth } from "./useAuth"
const AuthContext = createContext()


//const useAuthContext = () => useContext(AuthContext)
//const { Provider } = AuthContext;
const AuthProvider = ({ children }) => {
	const {user,setUser,signIn, signUp, signOut,isOnline,isAuthed} = useAuth()
    

	return <AuthContext.Provider value={{user,setUser,signIn, signUp, signOut,isOnline,isAuthed}}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
