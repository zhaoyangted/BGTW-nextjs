import React, { useState } from "react"
import Layout from "../../../../components/layout/Layout"
import Link from "next/link"
import styles from "../../../../components/account.module.css"
import useSWR from "swr"
import { useRouter } from "next/router"
import axios from "axios"
//import { METHODS } from "http"
const Refund = () => {
	const { query } = useRouter()
	const activeTab = useActiveTab()
	const { id } = query
	function useActiveTab() {
		const activeTab = query.activeTab || "account"
		return activeTab
	}
	//console.log(id)
	const fetcher = (url) => fetch(url, { credentials: "include", method: "POST" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + `/api/member/orders/refund/${id}`, fetcher)
	const [formData, setFormData] = useState({})
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
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
	}
	return (
		<>
			<Layout parent="Home" /*sub="Account" */ subChild=" > 會員中心">
				<div className="page-content pt-50 pb-50">
					<div className="container-fluid">
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
													<Link href="/page-login" className="nav-link">
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
											<div className="container">
												<div className="col-lg-">
													{/* <section className={styles.content_box}> */}
													<form action={process.env.apiServer+"/api/member/check/refund/" + id} method="post" onSubmit={submitForm}>
														<Link href={"/order/" + data?.id}>
															<h4>{data?.OID}</h4>
														</Link>
														<div className={styles.w16}>請勾選欲退貨品項</div>
														<div className={styles.cart02} style={{ marginTop: "30px" }}>
															<div className={styles.titlebox}>
																<div className={styles.name}>商品</div>
																<div className={styles.number}>數量</div>
																<div className={styles.price}>小計</div>
															</div>
															{data?.orders_detail?.map((o, i) => {
																return (
																	<ul key={i}>
																		<div className={styles.namebox}>
																			<div className={styles.name}>
																				<dd>
																					<img src={process.env.s3Host + o.d_img} />
																				</dd>
																				<dt>
																					<div className={styles.tt}>
																						<input
																							type="checkbox"
																							style={{ height: "initial", width: "initial" }}
																							name="d_back[]"
																							value={o.d_id}
																						/>
																						{o.d_title}
																					</div>
																					<div className={styles.sbox}>
																						<div className={styles.dtt}>商品編號</div>
																						<div className={styles.spec}>{o.d_model}</div>
																					</div>
																					<div className={styles.sbox}>
																						<div className={styles.dtt}>特價</div>
																						<div className={styles.spec}>
																							<span>
																								NT$
																								{parseInt(o.d_price)}
																							</span>
																						</div>
																					</div>
																					{o.d_addtitle ? (
																						<div className={styles.sbox}>
																							<div className={styles.dtt}>商品加購</div>
																							<div className={styles.spec}>{o.d_addtitle + "NT$" + o.d_addprice}</div>
																						</div>
																					) : null}
																				</dt>
																			</div>
																		</div>
																		<div className={styles.numberbox}>
																			<div className={styles.number}>{o.d_num}</div>
																			<div className={styles.price}>{parseInt(o.d_total)}</div>
																		</div>
																		{o.Stitle ? (
																			<div className={styles.salesbox}>
																				<div className={styles.slist}>
																					<div className={styles.icon}>
																						<span className={styles.icon_ok}>符合</span>
																					</div>
																					<div className={styles.sales}>
																						<a href="javascript:void(0)">{o.Stitle}</a>
																					</div>
																				</div>
																			</div>
																		) : null}
																	</ul>
																)
															})}
															<div className={styles.cart_line}></div>
														</div>

														<ul className={styles.styled_input}>
															<div className={styles.title03} style={{ marginTop: "30px" }}>
																申請退貨
															</div>
															<div className={styles.join_line}></div>
															<li>
																<h2>姓名</h2>
																<h4>{data?.member_info?.LName}</h4>
															</li>
															<li className={styles.half}>
																<h2>E-mail</h2>
																<input
																	type="text"
																	name="d_return_email"
																	value={data?.member_info?.LEmail}
																	onChange={handleInput}
																/>
															</li>
															<li className={styles.half}>
																<h2>聯絡電話*</h2>
																<input
																	type="text"
																	name="d_return_phone"
																	value={data?.member_info?.LPhone}
																	onChange={handleInput}
																/>
															</li>
															<li>
																<h2>退貨原因*</h2>
																<textarea name="d_return_content" rows="5" onChange={handleInput}></textarea>
															</li>
															<div className={styles.join_line}></div>
															<li style={{ textAlign: "center" }}>
																<input type="submit" className={styles.btn_style02} value="確認送出" />
																<input type="reset" className={styles.btn_style02} value="重新填寫" />
															</li>
														</ul>
													</form>
												</div>
											</div>
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

export default Refund
