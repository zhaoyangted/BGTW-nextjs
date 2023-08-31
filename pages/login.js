import React, { useEffect, useState } from "react"
import Link from "next/link"
import Layout from "../components/layout/Layout"
import styles from '../components/account.module.css'
import {useRouter} from "next/router"
import { useSession, signIn, signOut,getCsrfToken } from "next-auth/react"
function Login(context/* {csrfToken} */) {
	const [userInfo, setUserInfo] = useState({ email: "", password: "" })
	const [errorMsg, setErrorMsg] = useState("")
	const { status, data } = useSession()
	const router = useRouter()
	const handleSignout = (e) => {
		e.preventDefault()
		signOut()
	}
	const [csrfToken,setCsrfToken] = useState(getCsrfToken(context))
	/* useEffect(async()=>{
		try {
			const csrf = await (getCsrfToken(context))
			setCsrfToken(csrf)

		}catch(e){
			console.log(e)
		}
	},[]) */
	const handleImgClick =(e) =>{
		
		e.preventDefault();//console.log(e.target)
		e.target.src=process.env.apiServer+'/login/make_vcode_img'+'?'+Math.random()
	}
	async function handleSubmit(e) {
		e.preventDefault()
		const res = await signIn("credentials", {
			// Username,
			// Password,
            redirect: false,
			username: userInfo.email,
			password: userInfo.password,
			d_captcha: userInfo.d_captcha,
			// The page where you want to redirect to after a
			// successful login
			callbackUrl: `${window.location.origin}`
		})
		if (res?.error) {
            setErrorMsg(res.error)
        } 
	}
    //console.log(csrfToken)
	return (
		<>
			<Layout parent="首頁" /* sub="Pages"  */subChild=" > 會員中心">
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
												{status === "authenticated" ? (
													<div>
														This page is Protected for special people. like{"\n"}
														{/* {JSON.stringify(data.user, null, 2)} */}
														{status === "authenticated" && (
															<a href="#" onClick={handleSignout} className="btn-signin">
																Sign out
															</a>
														)}
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
																name="email"
																placeholder="Username or Email *"
																value={userInfo.email}
																onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
															/>
															</li>
															<li>
																<h2>密碼*</h2>
																{/* <input type="password" name="d_password" /> */}
																<input
																required
																type="password"
																name="password"
																placeholder="Your password *"
																value={userInfo.password}
																onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
															/>
															</li>
															<li>
																<h2>驗証碼*</h2>
																<input required type="text" name="d_captcha" onChange={({target})=> setUserInfo({...userInfo,d_captcha:target.value})} />
															</li>
															<li className={styles.contact_captcha}>
																<img  id="captcha" src={process.env.apiServer + "/login/make_vcode_img"} onClick={handleImgClick}/>
															</li>
															<div className={styles.pw}><a href='/fetchpassword'>忘記密碼?</a></div>
															<li style={{textAlign:"center"}}>
																<input type="submit" className={styles.btn_style02} value="登入" />
																<input type="button" className={styles.btn_style02} value="加入會員" onClick={()=>{router.push('/register')}} />
															</li>
															 <input
                                                                name="csrfToken"
                                                                type="hidden"
                                                                defaultValue={csrfToken}
                                                                />
															</ul>
														{/*<div className="form-group">
                                                            <input
                                                                name="csrfToken"
                                                                type="hidden"
                                                                defaultValue={csrfToken}
                                                                />
															<input
																type="text"
																required=""
																name="email"
																placeholder="Username or Email *"
																value={userInfo.email}
																onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
															/>
														</div>
														<div className="form-group">
															<input
																required=""
																type="password"
																name="password"
																placeholder="Your password *"
																value={userInfo.password}
																onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
															/>
														</div> */}
														{/* <div className="login_footer form-group">
															<div className="chek-form">
																<input type="text" required="" name="security" placeholder="Security code *" />
															</div>
															<span className="security-code">
																<b className="text-new">8</b>
																<b className="text-hot">6</b>
																<b className="text-sale">7</b>
																<b className="text-best">5</b>
															</span>
														</div>
														<div className="login_footer form-group mb-50">
															<div className="chek-form">
																<div className="custome-checkbox">
																	<input
																		className="form-check-input"
																		type="checkbox"
																		name="checkbox"
																		id="exampleCheckbox1"
																		value=""
																	/>
																	<label className="form-check-label" htmlFor="exampleCheckbox1">
																		<span>Remember me</span>
																	</label>
																</div>
															</div>
															<a className="text-muted" href="#">
																Forgot password?
															</a>
														</div>
														<div className="form-group">
															<button type="submit" className="btn btn-heading btn-block hover-up" name="login">
																Log in
															</button>
														</div> */}
													</form>
												)}
											</div>
										{/* </div> */}
									</div>
								</div>
							{/* </div>
						</div> 
					</div>*/}
				</div>
			</Layout>
		</>
	)
}
/* export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  } */
export default Login
