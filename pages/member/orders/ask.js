import React, { useState,useContext } from "react"
import Layout from "../../../components/layout/Layout"
import Link from "next/link"
import styles from "../../../components/account.module.css"
import useSWR from "swr"
import { useRouter } from "next/router"
import axios from "axios"
import { AuthContext } from "../../../util/useAuthContext"
import {toast} from 'react-toastify'
//import { METHODS } from "http"
const Ask = () => {
	const { query,router } = useRouter()
	const activeTab = useActiveTab()
	const {user,signOut,isOnline,setUser}=useContext(AuthContext)
	const { id } = query
	function useActiveTab() {
		const activeTab = query.activeTab || "account"
		return activeTab
	}
	//console.log(id)
	const fetcher = (url) => fetch(url, { credentials: "include", method: "POST" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + `/api/member/orders/ask/${id}`, fetcher)
	const [formData, setFormData] = useState({
		d_name:user?.d_pname,
		d_phone:user?.d_phone,
		d_email:user?.d_account,
		//d_county:user?.d_county,
		//d_district:user?.d_district,
		//d_zipcode:user?.d_zipcode,
		//d_address:user?.d_address,
		//d_cname:'',
	})
	const handleInput = (e) => {
		//console.log(e.targe?.name)
		e.preventDefault
		const fieldName = e.target?.name
		const fieldValue = e.target?.value

		setFormData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue || "",
		}))
	}
	const handleSignOut = async () => {
		await signOut()
	}
	const submitForm = async (e) => {
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
		await axios
			.post(formURL, data, { credentials: "include" })
			.then((response) => {if(response.status===200){toast(response.msg);router.back()}})
			.catch((response) => {response.status===404?toast(response.msg):console.log(response.msg)})
	}
	return (
		<>
			<Layout parent="Home" /*sub="Account" */ sub=" 會員中心">
				<div className="page-content pt-50 pb-50">
					<div className="container">
						<div className="row">
							<div className="col-lg-10 m-auto">
								<div className="row">
									<div className="col-md-3">
										<div className="dashboard-menu">
											<ul className="nav flex-column" role="tablist">
												<li className="nav-item">
													<Link
														href="/account/"
														className={!id ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(1)}
													>
														<i className="fi-rs-settings-sliders mr-10"></i>會員中心
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=info"
														className={activeTab === "info" ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(2)}
													>
														<i className="fi-rs-user mr-10"></i>會員資料
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=order"
														className={activeTab === "order" || id ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(3)}
													>
														<i className="fi-rs-shopping-cart-check mr-10"></i>購物紀錄
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=point"
														className={activeTab === "point" ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(4)}
													>
														<i className="fi-rs-money mr-10"></i>會員點數
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=favor"
														className={activeTab === "favor" ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(5)}
													>
														<i className="fi-rs-heart mr-10"></i>我的收藏
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=friend"
														className={activeTab === "friend" ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(6)}
													>
														<i className="fi-rs-users mr-10"></i>推薦朋友
													</Link>
												</li>
												<li className="nav-item">
												<Link
														href=""
														className="nav-link"
														onClick={(e) => {
															e.preventDefault
															handleSignOut()
														}}
													>
														<i className="fi-rs-sign-out mr-10"></i>登出
													</Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="col-md-9">
										<div className="tab-content account dashboard-content pl-50"></div>
										<div className={id ? "tab-pane fade active show" : "tab-pane fade "}>
											{/* <OrderInfo /> */}
											{/* <div className="container"> */}
											<div className="col-lg-">
												{/* <section className={styles.content_box}> */}
												<form
													action={process.env.apiServer + "/api/member/check/ask/" + id}
													method="post"
													onSubmit={submitForm}
												>
													<ul className={styles.styled_input}>
														<div className={styles.title03} style={{ marginTop: "30px" }}>
															訂單詢問
														</div>
														<div className={styles.join_line}></div>
														<li className={styles.half}>
															<h2>訂單編號</h2>
															<Link href={"/order/info?id=" + data?.id}>
																<h4>{data?.OID}</h4>
															</Link>
														</li>
														<li>
															<h2>姓名*</h2>
															<input type="text" name="d_name" value={formData.d_name} onChange={handleInput} required/>
														</li>
														<li className={styles.half}>
															<h2>E-mail*</h2>
															<input type="text" name="d_email" value={formData.d_email} onChange={handleInput} required/>
														</li>
														<li className={styles.half}>
															<h2>聯絡電話*</h2>
															<input type="text" name="d_phone" value={formData.d_phone} onChange={handleInput} required/>
														</li>
														<li>
															<h2>詢問內容</h2>
															<textarea name="d_content" rows="5" onChange={handleInput}required></textarea>
														</li>
														<div className={styles.join_line}></div>
														<li style={{ textAlign: "center" }}>
															<input type="submit" className={styles.btn_style02} value="確認送出" />{" "}
															<input type="reset" className={styles.btn_style02} value="重新填寫" />
														</li>
													</ul>
												</form>
												{/* </section> */}
											</div>
											{/* </div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Ask
