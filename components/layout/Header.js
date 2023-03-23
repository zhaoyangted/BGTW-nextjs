import Link from "next/link"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2"
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3"
import Search from "../ecommerce/Search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping,faBars,faHeart } from '@fortawesome/free-solid-svg-icons'
import Image  from 'next/image'
const img=Image
const Header = ({ totalCartItems, totalCompareItems, toggleClick, totalWishlistItems, data, config }) => {
	const [isToggled, setToggled] = useState(false)
	const [scroll, setScroll] = useState(0)

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
										<div className="HdNAVUBTopTT">
											<a className="menu-title" href={`http://localhost/products/index/${li[0].split("_")[1]}`}>
												{li[0].split("_")[0]}TOP
											</a>
										</div>
										{li[1].map((ul, index) => {
											//  console.log(ul)
											return (
												<li className="sub-mega-menu sub-mega-menu-width-22" key={index}>
													<Link href={`http://localhost/products/products_list/${ul.d_id}`}>{ul.d_title}</Link>
													<i className="fi-rs-angle-right"></i>
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
											{/* <li>
                                        <Link href="/shop-wishlist">
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/page-account">
                                            Order Tracking
                                        </Link>
                                    </li> */}
										</ul>
									) : null}
								</div>
							</div>
							{/* 							<div className=" col-md-4 col-lg-4">
								<div className="text-center">
									<div id="news-flash" className="d-inline-block">
										<ul>
											<li>
											{config?Object.values(config)[4]:null}
												 <Link href="/shop-grid-right">View details</Link> 
											</li>
										</ul>
									</div>
								</div>
							</div> */}
							<div className=" col-md-6 col-lg-6">
								<div className="header-info header-info-right">
									<ul>
										<img src="/assets/imgs/theme/TpTLEic01.svg" />
										<li>客服專線: {config ? Object.values(config)[8] : null}</li>
										<i className="fi-rs-angle-small-right" style={{ fontWeight: "900" }}></i>
										<Link href="/page-account">相關協助與聯繫我們</Link>
										{/*   <li>
                                        <Link href="/#" className="language-dropdown-active">

                                            <i className="fi-rs-world"></i>English<i className="fi-rs-angle-small-down"></i>

                                        </Link>
                                        <ul className="language-dropdown">
                                            <li>
                                                <Link href="/#">

                                                    <img src="/assets/imgs/theme/flag-fr.png" alt="" />Français
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a className="language-dropdown-active" href="#">
                                            USD <i className="fi-rs-angle-small-down"></i>
                                        </a>
                                        <ul className="language-dropdown">
                                            <li>
                                                <a href="#">
                                                    <img src="/assets/imgs/theme/flag-ru.png" alt="" />
                                                    EU
                                                </a>
                                            </li>
                                        </ul>
                                    </li> */}
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
								<a href="/guide/first" className="user__link user__link--register">
								加入會員</a>
										<a href="/login" className="user__link user__link--login">
										會員登入</a>
							</div>
							{/* <div className="header-right IntMemberStatus">
								<Link href="/shop-compare">加入會員</Link>

								<Link className="IntMemberBefore" href="/shop-compare">
									會員登入
								</Link>
							</div> */}
						</div>
					</div>
				</div>
				<div className="header-middle header-middle-ptb-1 d-none d-lg-block">
					<div className="row" style={{ margin: "0px 10px 0px 10px"}}>
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
										{/* <div className="search-location">
                                        <form action="#">
                                            <select className="select-active">
                                                <option>Your Location</option>
                                                <option>Alabama</option>
                                                <option>Alaska</option>
                                                <option>Arizona</option>
                                                <option>Delaware</option>
                                                <option>Florida</option>
                                                <option>Georgia</option>
                                                <option>Hawaii</option>
                                                <option>Indiana</option>
                                                <option>Maryland</option>
                                                <option>Nevada</option>
                                                <option>New Jersey</option>
                                                <option>New Mexico</option>
                                                <option>New York</option>
                                            </select>
                                        </form>
                                    </div> */}
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
											<Link href="/page-account" className="mini-menu-icon">
												<FontAwesomeIcon icon={faBars}  className="fi-ss-shopping-cart"  />
												{/* <i className="fi fi-br-menu-burger"></i> */}
												{/* <img className="svgInject" alt="Nest" src="/assets/imgs/theme/icons/icon-user.svg" /> */}
											<span className="lable">會員服務</span>
											</Link>
											
											{config?<div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
												{/* <ul>
													<li>
														<Link href="/page-account">
															<i className="fi fi-rs-user mr-10"></i>My Account
														</Link>
													</li>
													<li>
														<Link href="/page-account">
															<i className="fi fi-rs-location-alt mr-10"></i>Order Tracking
														</Link>
													</li>
													<li>
														<Link href="/page-account">
															<i className="fi fi-rs-label mr-10"></i>My Voucher
														</Link>
													</li>
													<li>
														<Link href="/shop-wishlist">
															<i className="fi fi-rs-heart mr-10"></i>My Wishlist
														</Link>
													</li>
													<li>
														<Link href="/page-account">
															<i className="fi fi-rs-settings-sliders mr-10"></i>Setting
														</Link>
													</li>
													<li>
														<Link href="/page-login">
															<i className="fi fi-rs-sign-out mr-10"></i>Sign out
														</Link>
													</li>
												</ul> */}
													
													
														
															<div className="HdNAVUBTopTT02">會員服務專區</div>
															<div className="mendercont">
																<div className="ImeALBox">
																	<ul className="IntmenderCr"><Link href="member">前往會員中心</Link></ul>
																	<ul className="ImePs"><Link href="member/orders">購物紀錄與訂單查詢</Link></ul>
																	<ul className="ImeLovepord"><Link href="member/favorite">我的收藏</Link></ul>
																	<ul className="ImeFriend"><Link href="member/friend">邀請好友加入會員</Link></ul>
																</div>
																<div className="ImeALBox">
																	<ul className="ImcoutBx"><Link href="member/account">會員資料修改</Link></ul>
																	<ul className="ImcoutBx"><Link href="member/point">會員點數查詢</Link></ul>
																	<ul className="ImcoutBx"><Link href="member/account">訂閱/取消 電子報</Link></ul>
																	<ul className="ImcoutBx"><Link href="qa">常見問題</Link></ul>
																</div>
																<div className="ImeALBox">
																	<ul className="ImeTel">服務專線：{config?Object.values(config)[9]:null} {Object.values(config)[10]}</ul>
																	{Object.values(config)[11]?
																		<ul className="ImeEml">聯絡我們：{Object.values(config)[11]}</ul>
																	:null}
																</div>
															</div>
														
													
											</div>:null}
										</div>
										<div className="header-action-icon-2">
											<Link href="/shop-cart" className="mini-cart-icon">
												{/* <img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg" /> */}
												{/* <i className="fi fi-ss-shopping-cart"></i> */}
												<FontAwesomeIcon icon={faCartShopping}  className="fi-ss-shopping-cart"/>
												<span className="pro-count blue">{totalCartItems}</span>
												<span className="lable">購物車</span>
											</Link>
											
											<div className="cart-dropdown-wrap cart-dropdown-hm2">
												<ul>
													<li>
														<div className="shopping-cart-img">
															<Link href="/shop-grid-right">
																<img alt="Evara" src="/assets/imgs/shop/thumbnail-3.jpg" />
															</Link>
														</div>
														<div className="shopping-cart-title">
															<h4>
																<Link href="/shop-grid-right">Plain Striola Shirts</Link>
															</h4>
															<h3>
																<span>1 × </span>
																$800.00
															</h3>
														</div>
														<div className="shopping-cart-delete">
															<Link href="/#">
																<i className="fi-rs-cross-small"></i>
															</Link>
														</div>
													</li>
													<li>
														<div className="shopping-cart-img">
															<Link href="/shop-grid-right">
																<img alt="Evara" src="/assets/imgs/shop/thumbnail-4.jpg" />
															</Link>
														</div>
														<div className="shopping-cart-title">
															<h4>
																<Link href="/shop-grid-right">Macbook Pro 2022</Link>
															</h4>
															<h3>
																<span>1 × </span>
																$3500.00
															</h3>
														</div>
														<div className="shopping-cart-delete">
															<Link href="/#">
																<i className="fi-rs-cross-small"></i>
															</Link>
														</div>
													</li>
												</ul>
												<div className="shopping-cart-footer">
													<div className="shopping-cart-total">
														<h4>
															Total
															<span>$383.00</span>
														</h4>
													</div>
													<div className="shopping-cart-button">
														<Link href="/shop-cart">View cart</Link>
														<Link href="/shop-checkout">Checkout</Link>
													</div>
												</div>
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
					<div className="container" style={{maxWidth:"1200px" }}>
						<div className="header-wrap header-space-between position-relative">
							<div className="logo logo-width-1 d-block d-lg-none">
								<Link href="/">
									<img src="/assets/imgs/theme/beautygarage_logo.svg" alt="logo" />
								</Link>
							</div>
							<div className="header-nav d-none d-lg-flex">
								{/* <div className="main-categori-wrap d-none d-lg-block">
                                <a className="categories-button-active" onClick={handleToggle}>
                                    <span className="fi-rs-apps"></span>
                                    <span className="et">Browse</span> All Categories
                                    <i className="fi-rs-angle-down"></i>
                                </a>

                                <div className={isToggled ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open" : "categories-dropdown-wrap categories-dropdown-active-large font-heading"}>
                                    <div className="d-flex categori-dropdown-inner">
                                        <CategoryProduct2 />
                                        <CategoryProduct3 />
                                    </div>
                                    <div className="more_slide_open" style={{ display: "none" }}>
                                        <div className="d-flex categori-dropdown-inner">
                                            <ul>
                                                <li>
                                                    <Link href="/products">

                                                        {" "}
                                                        <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />Milks and Dairies
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/products">

                                                        {" "}
                                                        <img src="/assets/imgs/theme/icons/icon-2.svg" alt="" />Clothing & beauty
                                                    </Link>
                                                </li>
                                            </ul>
                                            <ul className="end">
                                                <li>
                                                    <Link href="/products">

                                                        {" "}
                                                        <img src="/assets/imgs/theme/icons/icon-3.svg" alt="" />Wines & Drinks
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/products">

                                                        {" "}
                                                        <img src="/assets/imgs/theme/icons/icon-4.svg" alt="" />Fresh Seafood
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="more_categories">
                                        <span className="icon"></span> <span className="heading-sm-1">Show more...</span>
                                    </div>
                                </div>
                            </div> */}
								{data ? (
									<Navmenu />
								) : null}
							</div>
							{/* <div className="hotline d-none d-lg-flex">
                            <img src="/assets/imgs/theme/icons/icon-headphone.svg" alt="hotline" />

                            <p>
                                1900 - 888<span>24/7 Support Center</span>
                            </p>
                        </div> */}

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
										<Link href="/shop-cart" >
											{/* <i className="fi fi-ss-shopping-cart"></i> */}
											
											<img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg" />
											<span className="pro-count white">{totalCartItems}</span>
										</Link>
										{/* <div className="cart-dropdown-wrap cart-dropdown-hm2">
											<ul>
												<li>
													<div className="shopping-cart-img">
														<Link href="/shop-grid-right">
															<img alt="Evara" src="/assets/imgs/shop/thumbnail-3.jpg" />
														</Link>
													</div>
													<div className="shopping-cart-title">
														<h4>
															<Link href="/shop-grid-right">Plain Striola Shirts</Link>
														</h4>
														<h3>
															<span>1 × </span>
															$800.00
														</h3>
													</div>
													<div className="shopping-cart-delete">
														<Link href="/#">
															<i className="fi-rs-cross-small"></i>
														</Link>
													</div>
												</li>
												<li>
													<div className="shopping-cart-img">
														<Link href="/shop-grid-right">
															<img alt="Evara" src="/assets/imgs/shop/thumbnail-4.jpg" />
														</Link>
													</div>
													<div className="shopping-cart-title">
														<h4>
															<Link href="/shop-grid-right">Macbook Pro 2022</Link>
														</h4>
														<h3>
															<span>1 × </span>
															$3500.00
														</h3>
													</div>
													<div className="shopping-cart-delete">
														<Link href="/#">
															<i className="fi-rs-cross-small"></i>
														</Link>
													</div>
												</li>
											</ul>
											<div className="shopping-cart-footer">
												<div className="shopping-cart-total">
													<h4>
														Total
														<span>$383.00</span>
													</h4>
												</div>
												<div className="shopping-cart-button">
													<Link href="/shop-cart">View cart</Link>
													<Link href="/shop-checkout">Checkout</Link>
												</div>
											</div>
										</div> */}
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

const mapStateToProps = (state) => ({
	totalCartItems: state.cart.length,
	totalCompareItems: state.compare.items.length,
	totalWishlistItems: state.wishlist.items.length,
})

export default connect(mapStateToProps, null)(Header)
