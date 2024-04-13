import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import useClickOutside from "../../util/outsideClick"
import Search from "../ecommerce/Search"
import { AuthContext, useAuthContext } from "../../util/useAuthContext"
import styles from "../../components/catmenu.module.css"
import { useRouter } from "next/router"
const MobileMenu = ({ isToggled, toggleClick, data, setToggled }) => {
	const { user, setUser, isOnline, signOut } = useContext(AuthContext)
	const Router = useRouter()
	const [isMactive, setIsMactive] = useState({
		status: false,
		key: "100",
	})
	const [isMactive2, setIsMactive2] = useState({
		status: false,
		key: "100",
	})
	const [isMactive3, setIsMactive3] = useState({
		status: false,
		key: "100",
	})
	const handleSignOut = async () => {
		await signOut()
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
	let domNode = useClickOutside(() => {
		setIsMactive({
			status: false,
		})
		setIsMactive2({
			status: false,
		})
		//toggleClick()
	})
	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			setToggled(false)
			/* console.log(
			  `App is changing to ${url} ${
				shallow ? 'with' : 'without'
			  } shallow routing`
			) */
		}

		Router.events.on("routeChangeStart", handleRouteChange)
	}, [])
	const Navmenu = () => {
		return (
			<nav ref={domNode}>
				<ul className="mobile-menu">
					{/* 1st level */}
					{Object.entries(data).map((li, index) => {
						return (
							<li
								key={index}
								className={"menu-item-has-children"}
								/* className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"} */
							>
								<Link
									href={{ pathname: "/products/toplist", query: { id: li[0].split("_")[1], page: 1 } }}
									//as={`/products/top_list/${li[0].split("_")[1]}`}
									rel="nofollow"
								>
									{li[0].split("_")[0]}
								</Link>
								<span className="menu-expand" onClick={() => handleMtoggle(index)}>
									{isMactive.key === index ? (
										<i className="fi-rs-angle-down"></i>
									) : (
										<i className="fi-rs-angle-right"></i>
									)}
								</span>
								{/* 2nd level */}
								{li[1].length > 0 && (
									<ul className={isMactive.key == index ? "dropdown" : "d-none"}>
										{li[1].map((ul, i) => {
											return (
												<li key={i} className={"menu-item-has-children"}>
													<Link
														href={{ pathname: "/products/plist", query: { id: ul.d_id, page: 1 } }}
														shallow={false}
														replace={false}
														rel="nofollow"
														//as={`/products/products_list/${ul.d_id}`}
													>
														{ul.d_title}
													</Link>
													{ul.Subdata?.length > 0 && (
														<span className="menu-expand" onClick={() => handleMtoggle2(i)}>
															{isMactive2.key === i ? (
																<i className="fi-rs-angle-down"></i>
															) : (
																<i className="fi-rs-angle-right"></i>
															)}
														</span>
													)}
													{/* 3rd level */}
													<ul className={isMactive2.key == i ? "dropdown" : "d-none"}>
														{ul.Subdata?.map((lii, ii) => {
															return (
																<li key={ii} className={styles.lii}>
																	<Link
																		href={{ pathname: "/products/plist", query: { id: lii.d_id, page: 1 } }}
																		shallow={false}
																		replace={false}
																		rel="nofollow"
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
									</ul>
								)}
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
							<Search data={data} />
						</div>
						<div className="mobile-menu-wrap mobile-header-border">
							{data ? (
								<Navmenu /* ref={domNode} */ />
							) : (
								<nav>
									<ul className="mobile-menu"></ul>
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
							<h5 className="mb-15 text-grey-4">追蹤我們</h5>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
							</Link>
							{/* <Link href="#">
								<img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
							</Link>
							<Link href="#">
								<img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
							</Link> */}
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
