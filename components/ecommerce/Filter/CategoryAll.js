import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { updateProductCategory } from "../../../redux/action/productFiltersAction"
import Link from "next/link"
//import useClickOutside from "../../../util/outsideClick";
import styles from "../../catmenu.module.css"
import Tags from "./Tags"
const CategoryAll = ({ updateProductCategory, menusData }) => {
	const router = useRouter()
	//console.log(menusData)
	const menusArray = menusData ? Object.entries(menusData) : null
	//console.log(menusArray)
	const selectCategory = (e, category) => {
		e.preventDefault()
		// removeSearchTerm();
		updateProductCategory(category)
		router.push({
			pathname: "/products/plist",
			query: {
				id: category, //
				page:0
			},
		})
	}
	const [isActive, setIsActive] = useState({
		status: false,
		key: "",
	})
	const [isActive2, setIsActive2] = useState({
		status: false,
		key: "",
	})
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
	const handleToggle2 = (key) => {
		if (isActive2.key === key) {
			setIsActive2({
				status: false,
			})
		} else {
			setIsActive2({
				status: true,
				key,
			})
		}
	}
	const handleCat = (url,query) =>{
		router.push({pathname:url,query:{id:query}},undefined,{shallow:false})

	}
	/* let domNode = useClickOutside(() => {
		setIsActive({
			status: false,
		})
	}) */

	//console.log(isActive)
	return (
		menusData && (
			<>
				<ul className="mobile-menu-wrap" /* ref={domNode} */>
					{menusArray?.map((ul, index) => {
						return (
							<li key={index} className={styles.menuitemhaschildren + styles.menuitem}>
								<Link href="#">{ul[0].split("_")[0]}</Link>
								<span className="menu-expand" onClick={() => handleToggle(index)}>
									<i className="fi-rs-angle-small-down"></i>
								</span>
								{ul[1]?.length >= 0 && (
									<ul className={isActive.key == index ? "dropdown " + styles.menuitem : "d-none " + styles.menuitem}>
										{ul[1]?.map((li, i) => {
											return (
												<li
													className={"menu-item-has-children" +styles.menuitem
														/* isActive2.key == i
															? "menu-item-has-children dropdown " + styles.menuitem
															: "menu-item-has-childrend-none " + styles.menuitem */
													}
													key={i}
												>
													<Link
														href={{pathname:"/products/plist" ,query:{id:li.d_id,page:1}}}
														replace={false}
														shallow={false}
														//onClick={handleCat("/products/plist",li.d_id)}
														//as={`/products/products_list/${ul.d_id}`}
													>
														{li.d_title}
													</Link>
													<span className="menu-expand" onClick={() => handleToggle2(i)}>
														{li.Subdata?.length > 0 && <i className="fi-rs-angle-small-right"></i>}
													</span>
													<ul className={isActive2.key == i ? styles.dropdown : "d-none"}>
														{li.Subdata?.map((lii, ii) => {
															return (
																<li key={ii} className={styles.lii}>
																	<Link
																		href={{pathname:"/products/plist" ,query:{id:li.d_id,page:1}}}
																		replace={false}
																		shallow={false}
																		//onClick={handleCat("/products/plist",li.d_id)}
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
					<div className="mt-10"></div>
								<Tags />
				</ul>
			</>
		)
	)
}

export default connect(null, { updateProductCategory })(CategoryAll)
