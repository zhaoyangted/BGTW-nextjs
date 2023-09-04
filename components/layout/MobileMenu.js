import Link from "next/link"
import { useState } from "react"
import useClickOutside from "../../util/outsideClick"
import Search from "../ecommerce/Search"
//import { useSession, signIn, signOut } from "next-auth/react"
import { useAuthContext } from "../../util/useAuthContext"
import { useAuth } from "../../util/useAuth"
const MobileMenu = ({ isToggled, toggleClick, data }) => {
	//const { status, data: session } = useSession()
	const {user,setUser,isOnline,signOut} = useAuth()
	const [isActive, setIsActive] = useState({
		status: false,
		key: "",
	})
	const handleSignOut = async () => {
		if (user.isLoggedIn ) {
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
	}
	}
	const handleToggle = (key) => {
		if (isActive.key === key) {
			setIsActive({
				status: false,
			})
		} else {
			setIsActive({
				status: true,
				key,
			})
		}
	}

	let domNode = useClickOutside(() => {
		setIsActive({
			status: false,
		})
	})
	const Navmenu = () => {
		return (
			<nav>
				<ul className="mobile-menu" ref={domNode}>
					{Object.entries(data).map((li, index) => {
						return (
							<li
								key={index}
								className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"}
							>
								<span className="menu-expand" onClick={() => handleToggle(index)}>
									<i className="fi-rs-angle-small-down"></i>
								</span>
								<Link href={`/products/top_list/${li[0].split("_")[1]}`}>{li[0].split("_")[0]}TOP</Link>
								<ul className={isActive.key == index ? "dropdown" : "d-none"}>
									{li[1].map((ul, index) => {
										return (
											<li key={index}>
												<Link href={"/products/products_list/" + ul.d_id}>{ul.d_title}</Link>
												<span className="menu-expand">
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
								<img src="/assets/imgs/theme/beautygarage_logo.svg" alt="logo" />
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
								<Navmenu />
							) : (
								<nav>
									<ul className="mobile-menu" ref={domNode}>
										<li className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
										<li className={isActive.key == 2 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
										<li className={isActive.key == 3 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
										<li className={isActive.key == 4 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
										<li className={isActive.key == 5 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
										<li className={isActive.key == 6 ? "menu-item-has-children active" : "menu-item-has-children"}>
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
										</li>
									</ul>
								</nav>
							)}
						</div>
						<div className="mobile-header-info-wrap mobile-header-border">
							{/* <div className="single-mobile-header-info mt-30">
								<Link href="/page-contact">Our location</Link>
							</div> */}
							{user?.isLoggedIn ? (
								<div className="single-mobile-header-info">
									<Link href="/account">會員中心</Link>
									會員{user?.data?.d_pname}您好!您的目前等級：{user?.data?.d_title}
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
