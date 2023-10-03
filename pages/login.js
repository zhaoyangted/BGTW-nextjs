import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "../components/layout/Layout"
import styles from "../components/account.module.css"
import { useRouter } from "next/router"
import { AuthContext, useAuthContext } from "../util/useAuthContext"
import { useAuth } from "../util/useAuth"
function Login() {
	const [userInfo, setUserInfo] = useState({ d_account: "", d_password: "", d_captcha: "" })
	const {user,setUser,signIn,signOut} = useContext(AuthContext)
	const router = useRouter()
	const handleSignout = (e) => {
		e.preventDefault()
		//signOut()
		signOut()
	}
	const handleImgClick = (e) => {
		e.target.src = process.env.apiServer + "/login/make_vcode_img" + "?" + Math.random()
	}
	async function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(userInfo).forEach(([key, value]) => {
			data.append(key, value)
		})
		//console.log(data)
		await signIn(data)
	}
	/* useEffect(() => {
		if (user.isLoggedIn) {
			router.push("/account/")
		}
	}, []) */
	return (
		<>
			<Layout parent="首頁" /* sub="Pages"  */ sub=" 會員中心">
				<div className="page-content pt-150 pb-150">
					<div className="container">
						{/*<div className="row">
							 <div className="col-xl-8 col-lg-10 col-md-12 m-auto"> */}
						<div className="row col-lg-12 col-md-12 col-sm-12 col-xs-12 m-auto">
							{/* <div className="col-lg-6 pr-30 d-none d-lg-block">
										<img className="border-radius-15" src="assets/imgs/page/login-1.png" alt="" />
									</div> */}
							{/*<div className="col-lg-6 col-md-8">
										 <div className="login_wrap widget-taber-content background-white"> */}
							<div className={styles.content_box}>
								<div className={styles.mbox}>
									<h1 className={styles.title01}>會員登入</h1>
									{/* <p className="mb-30">
														Don't have an account? <Link href="/page-register">{errorMsg?errorMsg:'Create here'}</Link>
													</p> */}
								</div>
								{user?.isLoggedIn ? (
									<div>
										This page is Protected for special people. like
										{JSON.stringify(user, null, 2)}
										<a href="#" onClick={handleSignout} className="btn-signin">
											Sign out
										</a>
									</div>
								) : (
									<form method="post" onSubmit={handleSubmit}>
										<ul className={styles.styled_input}>
											<li>
												<h2>帳號*</h2>
												{/* <input type="text" name="d_account" /> */}
												<input
													type="text"
													required
													name="d_account"
													placeholder="Email *"
													value={userInfo.d_account}
													onChange={({ target }) => setUserInfo({ ...userInfo, d_account: target.value })}
												/>
											</li>
											<li>
												<h2>密碼*</h2>
												{/* <input type="password" name="d_password" /> */}
												<input
													required
													type="password"
													name="d_password"
													placeholder="密碼 *"
													value={userInfo.d_password}
													onChange={({ target }) => setUserInfo({ ...userInfo, d_password: target.value })}
												/>
											</li>
											<li>
												<h2>驗証碼*</h2>
												<input
													required
													type="text"
													name="d_captcha"
													value={userInfo.d_captcha}
													onChange={({ target }) => setUserInfo({ ...userInfo, d_captcha: target.value })}
												/>
											</li>
											<li className={styles.contact_captcha}>
												<img
													id="captcha"
													src={process.env.apiServer + "/login/make_vcode_img"}
													onClick={handleImgClick}
												/>
											</li>
											<div className={styles.pw}>
												<a href="/fetchpassword">忘記密碼?</a>
											</div>
											<li style={{ textAlign: "center" }}>
												<input type="submit" className={styles.btn_style02} value="登入" />
												<input
													type="button"
													className={styles.btn_style02}
													value="加入會員"
													onClick={() => {
														router.push("/register")
													}}
												/>
											</li>
										</ul>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
export default Login
