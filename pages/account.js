import Layout from "../components/layout/Layout"
import Link from "next/link"
import React, { useState } from "react"
import Member from "../components/account/Member"
import Point from "../components/account/Point"
import AccEdit from "../components/account/AccEdit"
import Favorites from "../components/account/Favorites"
import { useSession,signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Orders from "../components/account/Orders"
import Friends from "../components/account/Friends"
import axios from "axios"
//import OrderInfo from "../components/account/OrderInfo"
const Account = (props) => {
	const { query } = useRouter()
	const { data: session } = useSession()
	const activeTab = useActiveTab()
	const router = useRouter()
	const orderId = query.orderId
	function useActiveTab() {
		const activeTab = query.activeTab || "account"
		return activeTab
	}
	/* const [activeIndex, setActiveIndex] = useState(1)
	const handleOnClick = (index) => {
		setActiveIndex(index) // remove the curly braces
	} */
	React.useEffect(() => {
		if (!session) {
			router.push("/login/")
		}
		return
	}, [])
	//console.log(activeTab)
	const handleSignOut = async () => {
		if (session) {
			const response = await axios.put(process.env.apiServer + "/api/auth/logout", { credentials: "include" })
			if (response.status === 200) {
				await signOut()
			} else {
				alert("logout failed")
				await signOut()
			}
		} else {
			alert("not login.")
		}
	}
	return (
		<>
			<Layout parent="首頁" /*sub="Account" */ subChild=" > 會員中心">
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
														className={activeTab === "account" ? "nav-link active" : "nav-link"}
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
														className={activeTab === "order" || orderId ? "nav-link active" : "nav-link"}
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
										<div className="tab-content account dashboard-content pl-50">
											<div className={activeTab === "account" ? "tab-pane fade active show" : "tab-pane fade "}>
												<Member />
											</div>
											<div className={activeTab === "info" ? "tab-pane fade active show" : "tab-pane fade "}>
												<AccEdit />
											</div>
											<div className={activeTab === "order" ? "tab-pane fade active show" : "tab-pane fade "}>
												<Orders />
											</div>
											<div className={activeTab === "point" ? "tab-pane fade active show" : "tab-pane fade "}>
												<Point />
											</div>
											<div className={activeTab === "favor" ? "tab-pane fade active show" : "tab-pane fade "}>
												<Favorites />
											</div>
											<div className={activeTab === "friend" ? "tab-pane fade active show" : "tab-pane fade "}>
												<Friends />
											</div>
											<div
												className={activeTab === "order" && orderId ? "tab-pane fade active show" : "tab-pane fade "}
											>
												{/* <OrderInfo /> */}
											</div>
											<div
												className={
													activeTab === "/member/orders/ask/" && orderId
														? "tab-pane fade active show"
														: "tab-pane fade "
												}
											></div>
											<div
												className={
													activeTab === "/member/orders/cancel/" && orderId
														? "tab-pane fade active show"
														: "tab-pane fade "
												}
											></div>
											<div
												className={
													activeTab === "/member/orders/refund/" && orderId
														? "tab-pane fade active show"
														: "tab-pane fade "
												}
											></div>
											<div
												className={
													activeTab === "/member/orders/pay/" && orderId
														? "tab-pane fade active show"
														: "tab-pane fade "
												}
											></div>
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

export default Account
