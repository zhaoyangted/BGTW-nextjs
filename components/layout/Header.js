import Link from "next/link"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Search from "../ecommerce/Search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faBars, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useSession, signIn, signOut } from "next-auth/react"
import styles from "../../components/header.module.css"
import axios from "axios"
axios.defaults.withCredentials = true
import {
	clearCart,
	closeCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
	openCart,
} from "../../redux/action/cart"
const Header = ({
	totalCartItems,
	totalCompareItems,
	toggleClick,
	totalWishlistItems,
	data,
	config,
	openCart,
	cartItems,
	activeCart,
	closeCart,
	increaseQuantity,
	decreaseQuantity,
	deleteFromCart,
	clearCart,
}) => {
	const [isToggled, setToggled] = useState(false)
	const [scroll, setScroll] = useState(0)
	const [apiData, setApiData] = useState({})
	const { status, data: session } = useSession()
	const price = () => {
		let price = 0
		cartItems.forEach((item) => (price += item.d_price * item.quantity))

		return price
	}
	// const menu = JSON.stringify(data)
	// console.log(menu)
	//console.log(Object.values(config))
	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrollCheck = window.scrollY >= 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		})
	})

	useEffect(() => {
		const point = async () => {
			let str = ""
			cartItems?.map((p, i) => {
				p.d_id ? (str = str + p.d_id + "@#" + p.quantity + "@#;") : null
			})
			str = str.replace(/;\s*$/, "")
			const res = await axios.post(process?.env?.apiServer + "/api/cart/cart/", {
				cart: str,
			})
			setApiData(res.data)
			//return res.data['BonusTotal']
		}
		point()
	}, [cartItems])
	const Navmenu = () => {
		return (
			<div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
				<nav>
					<ul>
						{Object.entries(data).map((li, index) => {
							// console.log(li)
							return (
								<li className="position-static" key={index}>
									{/* <img src="/assets/imgs/theme/icons/icon-hot.svg" alt="hot deals" /> */}
									<Link href={`/products/products_list/${li[0].split("_")[1]}`}>{li[0].split("_")[0]}</Link>
									{/* <i className="fi-rs-angle-down"></i> */}
									<ul className="mega-menu">
										<div className={styles.HdNAVUBTopTT}>
											<a className="menu-title" href={`/products/top_list/${li[0].split("_")[1]}`}>
												{li[0].split("_")[0]}TOP
											</a>
										</div>
										{li[1].map((ul, index) => {
											//  console.log(ul)
											return (
												<li className="sub-mega-menu sub-mega-menu-width-22" key={index}>
													<Link href={`/products/products_list/${ul.d_id}`}>{ul.d_title}</Link>
													<span className="menu-expand" onClick={() => handleToggle(index)}>
														<i className="fi-rs-angle-right"></i>
													</span>
												</li>
											)
										})}
									</ul>
								</li>
							)
						})}
					</ul>
				</nav>
			</div>
		)
	}
	const handleSignOut = async () => {
		if (status === "authenticated") {
			const response = await axios.put(process.env.apiServer + "/api/auth/logout/")
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
	const handleToggle = () => setToggled(!isToggled)
	// console.log(Object.values(config)[13])
	return (
		<>
			<header className="header-area header-style-1 header-height-2">
				<div className="mobile-promotion">
					<span>
						{config ? Object.values(config)[11] : null} | {config ? Object.values(config)[12] : null}
					</span>
				</div>
				<div className="header-top header-top-ptb-1 d-none d-lg-block">
					<div className="container-fluid">
						<div className="row align-items-center">
							<div className=" col-md-6 col-lg-6">
								<div className="header-info header-info-left">
									{config ? (
										<ul>
											<li className="header-info-left-info">
												<Link href="">{config ? Object.values(config)[11] : null}</Link>
											</li>
											<li className="header-info-left-info">
												<Link href="">{config ? Object.values(config)[12] : null}</Link>
											</li>
										</ul>
									) : null}
								</div>
							</div>
							<div className=" col-md-6 col-lg-6">
								<div className="header-info header-info-right">
									<ul>
										<img className={styles.img} src="/assets/imgs/theme/TpTLEic01.svg" />
										<li>客服專線: {config ? Object.values(config)[8] : null}</li>
										<i className="fi-rs-angle-small-right" style={{ fontWeight: "900" }}></i>
										<Link href="/">相關協助與聯繫我們</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-middle header-middle-ptb-1 d-none d-lg-block">
					<div className="row" style={{ margin: "0px 10px 0px 10px" }}>
						<div className="header-wrap">
							<div className="header-right">
								{status === "authenticated" ? (
									<>
										<Link href="/account/" className="user__link user__link--login">
											會員{session.user.data.d_pname}您好!您的目前等級：{session.user.data.d_title}
										</Link>
										<Link
											href="/#"
											onClick={(e) => {
												e.preventDefault
												handleSignOut()
											}}
											className="user__link user__link--register"
										>
											會員登出
										</Link>
									</>
								) : (
									<>
										<Link href="/login/" className="user__link user__link--login">
											會員登入
										</Link>
										<Link href="/register/" className="user__link user__link--register">
											加入會員
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="header-middle header-middle-ptb-1 d-none d-lg-block">
					<div className="row" style={{ margin: "0px 10px 0px 10px" }}>
						<div className="header-wrap header-space-between">
							<div className="logo logo-width-1">
								<Link href="/">
									<img src="/assets/imgs/theme/beautygarage_logo.svg" alt="logo" />
								</Link>
							</div>
							<div className="search-style-2">
								<Search data={data} />
							</div>
							<div className="header-right">
								<div className="header-action-right">
									<div className="header-action-2">
										<div className="header-action-icon-2">
											<Link href="/shop-compare">
												<img className="svgInject" alt="Evara" src="/assets/imgs/theme/icons/icon-compare.svg" />
												<span className="pro-count blue">{totalCompareItems}</span>
											</Link>
											<Link href="/shop-compare">
												<span className="lable ml-0"></span>
											</Link>
										</div>
										<div className="header-action-icon-2">
											<Link href="/shop-wishlist">
												{/* <FontAwesomeIcon icon={faHeart} size="lg"  className="svgInject"  /> */}
												<img className="svgInject" alt="Evara" src="/assets/imgs/theme/icons/icon-heart.svg" />
												<span className="pro-count blue">{totalWishlistItems}</span>
											</Link>
											<Link href="/shop-wishlist" legacyBehavior>
												<span className="lable">收藏</span>
											</Link>
										</div>
										<div className="header-action-icon-2">
											<Link href="/account" className="mini-menu-icon">
												<FontAwesomeIcon icon={faBars} className="fi-ss-shopping-cart" />
												{/* <i className="fi fi-br-menu-burger"></i> */}
												{/* <img className="svgInject" alt="Nest" src="/assets/imgs/theme/icons/icon-user.svg" /> */}
												<span className="lable">會員服務</span>
											</Link>

											{config ? (
												<div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
													<div className={styles.HdNAVUBTopTT02}>
														會員服務專區<i className="fi-rs-user ml-25" style={{ right: "0px" }}></i>
													</div>
													<div className={styles.mendercont}>
														<div className={styles.ImeALBox}>
															<ul className={styles.IntmenderCr}>
																<i className="fi-rs-home mr-20" style={{ left: "0px" }}></i>
																<Link
																	href={{
																		pathname: "/account",
																	}}
																>
																	前往會員中心
																</Link>
															</ul>
															<ul className={styles.ImePs}>
																<i className="fi-rs-list mr-20" style={{ left: "0px" }}></i>
																<Link href="/account/?activeTab=order">購物紀錄與訂單查詢</Link>
															</ul>
															<ul className={styles.ImeLovepord}>
																<i className="fi-rs-star mr-20" style={{ left: "0px" }}></i>
																<Link href="/account/?activeTab=favor">我的收藏</Link>
															</ul>
															<ul className={styles.ImeFriend}>
																<i className="fi-rs-users mr-20" style={{ left: "0px" }}></i>
																<Link href="/account/?activeTab=friend">邀請好友加入會員</Link>
															</ul>
														</div>
														<div className={styles.ImeALBox}>
															<ul className={styles.ImcoutBx}>
																<Link href="/account?activeTab=info">會員資料修改</Link>
															</ul>
															<ul className={styles.ImcoutBx}>
																<Link href="/account?activeTab=point">會員點數查詢</Link>
															</ul>
															<ul className={styles.ImcoutBx}>
																<Link href="/account?activeTab=info">訂閱/取消 電子報</Link>
															</ul>
															<ul className={styles.ImcoutBx}>
																<Link href="qa">常見問題</Link>
															</ul>
														</div>
														<div className={styles.ImeALBox}>
															<ul className={styles.ImeTel}>
																服務專線：{config ? Object.values(config)[9] : null} {Object.values(config)[10]}
															</ul>
															{Object.values(config)[11] ? (
																<ul className={styles.ImeEml}>聯絡我們：{Object.values(config)[11]}</ul>
															) : null}
														</div>
													</div>
												</div>
											) : null}
										</div>
										<div className="header-action-icon-2">
											<Link href="/cart" className="mini-cart-icon">
												<FontAwesomeIcon icon={faCartShopping} className="fi-ss-shopping-cart" />
												<span className="pro-count blue">{totalCartItems}</span>
												<span className={styles.cartlabel}>購物車</span>
											</Link>

											<div className="cart-dropdown-wrap cart-dropdown-hm2" style={{ wid: "460px" }}>
												<ul className="ICBoTX">
													<div className="HdNAVUBTopTT03">購物車狀態</div>
													<div className="IndSPCont">
														{cartItems.length > 0 ? (
															<ul>
																{cartItems.length > 0
																	? cartItems.map((item, i) => {
																			return (
																				<div className="IndSPContUr" key={i}>
																					<ul className="IndSprPHT">
																						<img src={"/" + item["d_img1"]} alt="" />
																					</ul>
																					<ul className="IndSprTxBx">
																						<li className="CrProdName">{item["d_title"]}</li>
																					</ul>
																					<ul className="IndSprBaX">
																						<li className="CrProdName">x{item["quantity"]}</li>
																					</ul>
																					<ul className="IndSprBaX">
																						<li className="TicPystxc04">
																							單價：NT$
																							{item["d_price"]}
																						</li>
																					</ul>
																				</div>
																			)
																	  })
																	: null}

																<div className="IndSPContUr02">
																	<div className="MneyBox">
																		<div className="tpSCtxb">
																			會員購物滿額
																			{apiData?.OneFreight?.d_free}元免運費
																		</div>
																		<div className="tpSCtxb">
																			商品紅利小計
																			<font color="#FF9EDB">{apiData.BonusTotal}點</font>
																		</div>
																	</div>
																</div>
																<div className="shopping-cart-footer">
																	<div className="shopping-cart-total">
																		<h4>
																			金額小計:
																			<span className="MenyToT">NT${price()}</span>
																		</h4>
																	</div>
																	<div className="shopping-cart-button">
																		<Link href="/cart">購物車</Link>
																		<Link href="/checkout">結帳</Link>
																	</div>
																</div>
															</ul>
														) : (
															<h4 style={{ textAlign: "center" }}>購物車空</h4>
														)}
													</div>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={
						scroll
							? "header-bottom header-bottom-bg-color sticky-bar stick"
							: "header-bottom header-bottom-bg-color sticky-bar"
					}
				>
					<div className="container" style={{ maxWidth: "1200px" }}>
						<div className="header-wrap header-space-between position-relative">
							<div className="logo logo-width-1 d-block d-lg-none">
								<Link href="/">
									<img src="/assets/imgs/theme/beautygarage_logo.svg" alt="logo" />
								</Link>
							</div>
							<div className="header-nav d-none d-lg-flex">{data ? <Navmenu /> : null}</div>
							<div className="header-action-icon-2 d-block d-lg-none">
								<div className="burger-icon burger-icon-white" onClick={toggleClick}>
									<span className="burger-icon-top"></span>
									<span className="burger-icon-mid"></span>
									<span className="burger-icon-bottom"></span>
								</div>
							</div>

							<div className="header-action-right d-block d-lg-none">
								<div className="header-action-2">
									<div className="header-action-icon-2">
										<Link href="/shop-wishlist">
											<img alt="Evara" src="/assets/imgs/theme/icons/icon-heart.svg" />
											<span className="pro-count white">{totalWishlistItems}</span>
										</Link>
									</div>
									<div className="header-action-icon-2">
										<Link href="/cart">
											{/* <i className="fi fi-ss-shopping-cart"></i> */}

											<img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg" />
											<span className="pro-count white">{totalCartItems}</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

const mapDispatchToProps = {
	closeCart,
	increaseQuantity,
	decreaseQuantity,
	deleteFromCart,
	openCart,
	clearCart,
}
const mapStateToProps = (state) => ({
	totalCartItems: state.cart.length,
	totalCompareItems: state.compare.items.length,
	totalWishlistItems: state.wishlist.items.length,
	cartItems: state.cart,
	activeCart: state.counter,
})

export default connect(mapStateToProps, mapDispatchToProps, null)(Header)
