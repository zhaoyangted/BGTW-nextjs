import { useState,useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import {toast} from 'react-toastify'
export const useAuth = () => {
	const [user, setUser] = useState(null)
    const router = useRouter()
    
	const signIn = async (data) => {
		try {
			let authresult = await axios.post(process.env.apiServer + "/api/auth/login", data, { credentials: "include" })
			//let userObj = { ...authresult.data?.foundUser }
			//userObj = authresult.data?.encodedToken;
            //console.log(authresult)
			setUser(authresult.data)
            router.back()
			toast("Login Successfull")
            
		} catch (err) {
			console.error(err)
			toast("Login Failed")
		}
	}

	const signUp = async (data) => {
		try {
			let authresult = await axios.post("/api/auth/signup", data,{credentials:'include'})
			let userObj = { ...authresult.data?.createdUser }
			userObj.token = authresult.data?.encodedToken
			setUser(userObj)
			toast("Sign Up Successfull")
		} catch (err) {
			console.error(err)
			toast("An Error Occuered")
		}
	}

    const isOnline = async () =>{
        try {
            let response = await axios.get(process.env.apiServer + "/api/auth/user", { credentials: "include" })
            
                if (response.data.isOnline){
                    return true
                }
                else 
                {
                    return false
                }
          
        } catch (err) {
            console.error(err)

        }
    }
    /* const isAuthed = async () =>{
        try {
            let response = await axios.get(process.env.apiServer + "/api/auth/user", { credentials: "include" })
            console.log(response.data)
                if (response.data.isLoggedIn) {
                    return true
                }
                else {
                    return false
                }
          
        } catch (err) {
            console.error(err)

        }
    } */
	const signOut = async () => {
		try {
			let response = await axios.put(process.env.apiServer + "/api/auth/logout", { credentials: "include" })
			if (response.status === 200) {
				setUser(null)
				router.push('/')
                toast("Logout Successfull")
			}
		} catch (err) {
			console.error(err)
			toast("Login Failed")
		}
	}
    useEffect(()=>{
        isOnline()
       
    },[])

    //console.log(user)
	return { user, signIn, signUp, signOut,isOnline,setUser/* ,isAuthed */}
}
