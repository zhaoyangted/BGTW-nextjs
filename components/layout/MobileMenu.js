import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import useClickOutside from "../../util/outsideClick"
import Search from "../ecommerce/Search"
//import { useSession, signIn, signOut } from "next-auth/react"
import { AuthContext, useAuthContext } from "../../util/useAuthContext"
import { useAuth } from "../../util/useAuth"
import axios from "axios"
import styles from '../../components/catmenu.module.css'
const MobileMenu = ({ isToggled, toggleClick, data }) => {
	//const { status, data: session } = useSession()
	const { user, setUser, isOnline, signOut } = useContext(AuthContext)
	const [isMactive, setIsMactive] = useState({
		status: false,
		key: "100",
	})
	const [isMactive2, setIsMactive2] = useState({
		status: false,
		key: "100",
	})
	const handleSignOut = async () => {
		//if (user.isLoggedIn ) {
		/* const response = await axios.put(process.env.apiServer + "/api/auth/logout", { credentials: "include" })
			if (response.status === 200) {
				await signOut()
			} else {
				alert("logout failed")
				await signOut()
			}
		} else {
			alert("not login.")
		} */
		await signOut()
		//}
	}
	const handleMtoggle = (key) => {
		if (isMactive.key === key) {
			setIsMactive({
				status: false,
			})
		} else {
			setIsMactive({
				status: true,
				key,
			})
		}
	}
	const handleMtoggle2 = (key) => {
		if (isMactive2.key === key) {
			setIsMactive2({
				status: false,
			})
		} else {
			setIsMactive2({
				status: true,
				key,
			})
		}
	}
	useEffect(() => {
		const getAuth = async () => {
			try {
				let response = await axios.get(process.env.apiServer + "/api/auth/user", { credentials: "include" })

				if (response.data.isLoggedIn) {
					setUser(response.data.data)
				} else {
					setUser("")
				}
			} catch (err) {
				console.error(err)
			}
		}
		getAuth()
	}, [])
	/* let domNode = useClickOutside(() => {
		setIsActive({
			status: false,
		})
	}) */
	const Navmenu = () => {
		return (
			<nav>
				<ul className="mobile-menu" /* ref={domNode} */>
					{/* 1st level */}
					{Object.entries(data).map((li, index) => {
						return (
							<li
								key={index}
								className={"menu-item-has-children"}
								/* className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"} */
							>
								<Link
									href={{ pathname: "/products/toplist", query: { id: li[0].split("_")[1] } }}
									//as={`/products/top_list/${li[0].split("_")[1]}`}
									rel="nofollow"
								>
									{li[0].split("_")[0]}
								</Link>
								<span className="menu-expand" onClick={() => handleMtoggle(index)}>
									{isMactive.key===index?<i className="fi-rs-angle-down"></i>:<i className="fi-rs-angle-right"></i>}
								</span>
								{/* 2nd level */}
								{li[1].length>0&&
								<ul className={isMactive.key == index ? "dropdown" : "d-none"}>
									{li[1].map((ul, i) => {
										return (
											<li
												key={i}
												className={
													"menu-item-has-children"
												}
											>
												<Link
													href={{ pathname: "/products/plist", query: { id: ul.d_id } }}
													//as={`/products/products_list/${ul.d_id}`}
												>
													{ul.d_title}
												</Link>
												{ul.Subdata?.length > 0 &&<span className="menu-expand" onClick={() => handleMtoggle2(i)}>
												{isMactive2.key === i?<i className="fi-rs-angle-down"></i>:<i className="fi-rs-angle-right"></i>}
												</span>}
												{/* 3rd level */}
												<ul className={isMactive2.key == i ? "dropdown" : "d-none"}>
												
													{ul.Subdata?.map((lii, ii) => {
														return (
															<li key={ii} className={styles.lii}>
																<Link
																	href={"/products/plist?id=" + lii.d_id}
																	//as={`/products/products_list/${li.d_id}`}
																>
																	{lii.d_title}
																</Link>
															</li>
														)
													})}
												</ul>
											</li>
										)
									})}
								</ul>}
							</li>
						)
					})}
				</ul>
			</nav>
		)
	}
	return (
		<>
			<div
				className={
					isToggled
						? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
						: "mobile-header-active mobile-header-wrapper-style"
				}
			>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-top">
						<div className="mobile-header-logo">
							<Link href="/">
								<img src="https://bgtwmedia.s3.ap-northeast-1.amazonaws.com/images/front/CKL_LOGO.svg" alt="logo" />
							</Link>
						</div>
						<div className="mobile-menu-close close-style-wrap close-style-position-inherit">
							<button className="close-style search-close" onClick={toggleClick}>
								<i className="icon-top"></i>
								<i className="icon-bottom"></i>
							</button>
						</div>
					</div>
					<div className="mobile-header-content-area">
						<div className="mobile-search search-style-3 mobile-header-border">
							{/* <form action="#">
								<input type="text" placeholder="Search for items…" />
								<button type="submit">
									<i className="fi-rs-search"></i>
								</button>
							</form> */}
							<Search data={data} />
						</div>
						<div className="mobile-menu-wrap mobile-header-border">
							{data ? (
								<Navmenu /* ref={domNode} */ />
							) : (
								<nav>
									<ul className="mobile-menu">
										{/* <li className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(1)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="/index">Home</Link>
											<ul className={isActive.key == 1 ? "dropdown" : "d-none"}>
												<li>
													<Link href="/index">Home 1</Link>
												</li>
												<li>
													<Link href="/index-2">Home 2</Link>
												</li>
												<li>
													<Link href="/index-3">Home 3</Link>
												</li>
												<li>
													<Link href="/index-4">Home 4</Link>
												</li>
											</ul> 
										</li>*/}
										{/* <li className={isActive.key == 2 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(2)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="/shop-grid-right">shop</Link>
											<ul className={isActive.key == 2 ? "dropdown" : "d-none"}>
												<li>
													<Link href="/shop-grid-right">Shop Grid – Right Sidebar</Link>
												</li>
												<li>
													<Link href="/shop-grid-left">Shop Grid – Left Sidebar</Link>
												</li>
												<li>
													<Link href="/shop-list-right">Shop List – Right Sidebar</Link>
												</li>
												<li>
													<Link href="/shop-list-left">Shop List – Left Sidebar</Link>
												</li>
												<li>
													<Link href="/shop-fullwidth">Shop - Wide</Link>
												</li>
												<li>
													<Link href="/shop-filter">Shop – Filter</Link>
												</li>
												<li>
													<Link href="/shop-wishlist">Shop – Wishlist</Link>
												</li>
												<li>
													<Link href="/cart">Shop – Cart</Link>
												</li>
												<li>
													<Link href="/shop-checkout">Shop – Checkout</Link>
												</li>
												<li>
													<Link href="/shop-compare">Shop – Compare</Link>
												</li>
											</ul>
										</li> */}
										{/* <li className={isActive.key == 3 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(3)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="#">Mega menu</Link>
											<ul className={isActive.key == 3 ? "dropdown" : "d-none"}>
												<li className="menu-item-has-children">
													<span className="menu-expand"></span>
													<Link href="#">Women's Fashion</Link>
													<ul className="dropdown">
														<li>
															<Link href="/shop-product-right">Dresses</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Blouses & Shirts</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Hoodies & Sweatshirts</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Women's Sets</Link>
														</li>
													</ul>
												</li>
												<li className="menu-item-has-children">
													<span className="menu-expand"></span>
													<Link href="#">Men's Fashion</Link>
													<ul className="dropdown">
														<li>
															<Link href="/shop-product-right">Jackets</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Casual Faux Leather</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Genuine Leather</Link>
														</li>
													</ul>
												</li>
												<li className="menu-item-has-children">
													<span className="menu-expand"></span>
													<Link href="#">Technology</Link>
													<ul className="dropdown">
														<li>
															<Link href="/shop-product-right">Gaming Laptops</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Ultraslim Laptops</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Tablets</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Laptop Accessories</Link>
														</li>
														<li>
															<Link href="/shop-product-right">Tablet Accessories</Link>
														</li>
													</ul>
												</li>
											</ul>
										</li> */}
										{/* <li className={isActive.key == 4 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(4)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="/blog-category-fullwidth">Blog</Link>
											<ul className={isActive.key == 4 ? "dropdown" : "d-none"}>
												<li>
													<Link href="/blog-category-grid">Blog Category Grid</Link>
												</li>
												<li>
													<Link href="/blog-category-list">Blog Category List</Link>
												</li>
												<li>
													<Link href="/blog-category-big">Blog Category Big</Link>
												</li>
												<li>
													<Link href="/blog-category-fullwidth">Blog Category Wide</Link>
												</li>
												<li className="menu-item-has-children">
													<span className="menu-expand"></span>
													<Link href="#">Single Product Layout</Link>
													<ul className="dropdown">
														<li>
															<Link href="/blog-post-left">Left Sidebar</Link>
														</li>
														<li>
															<Link href="/blog-post-right">Right Sidebar</Link>
														</li>
														<li>
															<Link href="/blog-post-fullwidth">No Sidebar</Link>
														</li>
													</ul>
												</li>
											</ul>
										</li> */}
										{/* <li className={isActive.key == 5 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(5)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="#">Pages</Link>
											<ul className={isActive.key == 5 ? "dropdown" : "d-none"}>
												<li>
													<Link href="/page-about">About Us</Link>
												</li>
												<li>
													<Link href="/page-contact">Contact</Link>
												</li>
												<li>
													<Link href="/page-account">My Account</Link>
												</li>
												<li>
													<Link href="/page-login-register">login/register</Link>
												</li>
												<li>
													<Link href="/page-purchase-guide">Purchase Guide</Link>
												</li>
												<li>
													<Link href="/page-privacy-policy">Privacy Policy</Link>
												</li>
												<li>
													<Link href="/page-terms">Terms of Service</Link>
												</li>
												<li>
													<Link href="/page-404">404 Page</Link>
												</li>
											</ul>
										</li> */}
										{/* <li className={isActive.key == 6 ? "menu-item-has-children active" : "menu-item-has-children"}>
											<span className="menu-expand" onClick={() => handleToggle(6)}>
												<i className="fi-rs-angle-small-down"></i>
											</span>
											<Link href="#">Language</Link>
											<ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
												<li>
													<Link href="#">English</Link>
												</li>
												<li>
													<Link href="#">French</Link>
												</li>
												<li>
													<Link href="#">German</Link>
												</li>
												<li>
													<Link href="#">Spanish</Link>
												</li>
											</ul>
										</li> */}
									</ul>
								</nav>
							)}
						</div>
						<div className="mobile-header-info-wrap mobile-header-border">
							{/* <div className="single-mobile-header-info mt-30">
								<Link href="/page-contact">Our location</Link>
							</div> */}
							{user ? (
								<div className="single-mobile-header-info">
									<Link href="/account">會員中心</Link>
									會員{user?.d_pname}您好!您的目前等級：{user?.d_title}
								</div>
							) : (
								<Link href="/login">會員登入 / 加入會員</Link>
							)}
							{/* <div className="single-mobile-header-info">
								<Link href="#">(+01) - 2345 - 6789</Link>
							</div> */}
						</div>
						<div className="mobile-social-icon">
							<h5 className="mb-15 text-grey-4">Follow Us</h5>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MobileMenu
