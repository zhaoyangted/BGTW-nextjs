import { useState } from "react"
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
            console.log(authresult.data)
			setUser(authresult.data)
			toast("Login Successfull")
            router.push(
                '/account/'
            )
		} catch (err) {
			console.error(err)
			toast("Login Failed")
		}
	}

	const signUp = async (data) => {
		try {
			let authresult = await axios.post("/api/auth/signup", data)
			let userObj = { ...authresult.data?.createdUser }
			userObj.token = authresult.data?.encodedToken
			setUser(userObj)
			toast("Sign Up Successfull")
		} catch (err) {
			console.error(err)
			toast("An Error Occuered")
		}
	}

	const signOut = async () => {
		try {
			let response = await axios.put(process.env.apiServer + "/api/auth/logout", { credentials: "include" })
			if (response.status === 200) {
				setUser(null)
				toast("Logout Successfull")
			}
		} catch (err) {
			console.error(err)
			toast("Login Failed")
		}
	}

	return { user, signIn, signUp, signOut }
}
