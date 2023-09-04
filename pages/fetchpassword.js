import Layout from "../components/layout/Layout"
import Link from "next/link"
import React, { useContext, useState } from "react"
//import { useSession } from "next-auth/react"
import { AuthContext, useAuthContext } from "../util/useAuthContext"
import { useAuth } from "../util/useAuth"
import { useRouter } from "next/router"
import styles from '../components/account.module.css'
const GetPassword = (props) => {
	const {user,setUser,signOut}=useContext(AuthContext)
	//const { data: session } = useSession()
	const router = useRouter()
	const [formData, setFormData] = useState({})
	const handleInput = (e) => {
		//console.log(e.targe?.name)
		e.preventDefault
		const fieldName = e.target?.name
		const fieldValue = e.target?.value

		setFormData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue||'',
		}))
	}
	const handleImgClick =(e) =>{
		
		e.preventDefault();//console.log(e.target)
		e.target.src=process.env.apiServer+'/login/make_vcode_img'+'?'+Math.random()
	}
	const submitForm = async(e) => {
		// We don't want the page to refresh
		e.preventDefault()
		//console.log(e.target.action)
		const formURL = e.target.action
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(formData).forEach(([key, value]) => {
			data.append(key, value)
		})

		// POST the data to the URL of the form
		await axios.post(formURL, data, {credentials:'include'})
		.then(
			(response)=>console.log(response))
		.catch(
			(error)=>console.log(error))
	}
	React.useEffect(() => {
		if (user?.isLoggedIn) {
			router.push("/")
		}
		return
	}, [])

	return (
		<>
			<Layout parent="首頁" /*sub="Account" */ subChild=" > 會員中心">
				<div className="page-content pt-50 pb-50">
					<div className="container">
						<div className="row">
							<section className={styles.content_box}>
								<div className={styles.title01}>忘記密碼</div>
								<div className={styles.member}>
									<div className={styles.mbox}>
										<form action={process.env.apiSever+"/api/auth/forget/"} method="post" onSubmit={submitForm}>
											<ul className={styles.styled_input}>
												<li>
													<h2>E-mail</h2>
													<input type="text" name="d_account" onChange={handleInput} />
												</li>
												<li>
													<h2>驗証碼*</h2>
													<input type="text" name="d_captcha" onChange={handleInput}/>
												</li>
												<li className={styles.contact_captcha}>
													<img id="captcha" src={process.env.apiServer + "/login/make_vcode_img"} onClick={handleImgClick} />
												</li>
												<div className={styles.pw}>
													<Link href={process.env.apiServer+"/login"}>會員登入</Link>
												</div>
												<li style={{textAlign:"center"}}>
													<input type="submit" className={styles.btn_style02} value="發送至信箱" />{" "}
													<input
														type="button"
														className={styles.btn_style02}
														value="加入會員"
														onClick={()=>router.push('/login')}
													/>
												</li>
											</ul>
										</form>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default GetPassword
