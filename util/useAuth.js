import { useState,useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import {toast} from 'react-toastify'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
export const useAuth = () => {
	const [user, setUser] = useState(null)
    const router = useRouter()
    
	useEffect(()=>{
		//isOnline
		const getAuth = async () =>{
			try {
				let response = await axios.get(process.env.apiServer + "/api/auth/user", { credentials: "include" })
				
					if (response.data.isLoggedIn){
						setUser(response.data.data)
					}
					else 
					{
						setUser("")
					}
			  
			} catch (err) {
				console.error(err)
	
			}
		}
		getAuth()
	},[])
	const signIn = async (data) => {
		try {
			let authresult = await axios.post(process.env.apiServer + "/api/auth/login", data, { credentials: "include" })
			//let userObj = { ...authresult.data?.foundUser }
			//userObj = authresult.data?.encodedToken;
            //console.log(authresult)
			if (authresult.status!==404){
			setUser(authresult.data)
            //router.back()
			redirect('/account')
			toast("登入成功")
			}else{
				console.log(authresult)
				toast("登入失敗=>"+authresult.msg+"")
			}
            
		} catch (err) {
			console.error(err)
			toast("登入失敗")
		}
	}

	const signUp = async (data) => {
		try {
			let authresult = await axios.post("/api/auth/signup", data,{credentials:'include'})
			let userObj = { ...authresult.data?.createdUser }
			userObj.token = authresult.data?.encodedToken
			setUser(userObj)
			toast("註冊成功")
		} catch (err) {
			console.error(err)
			toast("註冊失敗")
		}
	}

    const isOnline = async () =>{
        try {
            let response = await axios.get(process.env.apiServer + "/api/auth/user", { credentials: "include" })
            
                return response.data.isLoggedIn
          
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
				setUser("")
				//revalidatePath("/")
				redirect("/")
				//router.push('/',undefined,{shallow:false})
                toast("登出成功")
			}
		} catch (err) {
			console.error(err)
			toast("登出失敗")
		}
	}
   /*  useEffect(()=>{
        isOnline()
       
    },[])

    console.log(user) */
	return { user, signIn, signUp, signOut,isOnline,setUser/* ,isAuthed */}
}
