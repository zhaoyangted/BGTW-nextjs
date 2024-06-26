import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { updateProductCategory } from "../../../redux/action/productFiltersAction"
import Link from "next/link"
import styles from "../../catmenu.module.css"
import Tags from "./Tags"
const CategoryProduct = ({ updateProductCategory, menuDatas, menus }) => {
	const router = useRouter()
	const menusArray = menus ? Object.values(menus) : null /* Object.entries(menuDatas) */
	//const menusAll = Object.entries(menuDatas)
	const selectCategory = (e, category) => {
		e.preventDefault()
		// removeSearchTerm();
		updateProductCategory(category)
		router.push({
			pathname: "/products/plist",
			query: {
				id: category, 
				page:0
				//
			},
		})
	}
	const [isActive, setIsActive] = useState({
		status: true,
		key: "100",
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
	const handleCat = (url,query) =>{
		router.push({pathname:url,query:{id:query}},undefined,{shallow:false})

	}
	/* let domNode = useClickOutside(() => {
		setIsActive({
			status: false,
		})
	}) */
	useEffect(() => {
		menusArray?.map((li, index) => {
			//console.log(li.d_id,menuDatas.d_id)
			if (li.d_id === menuDatas.d_id) {
				setIsActive({ status: true, key: index })
				//console.log(index);
			}
		})
	}, [menus])
	//console.log(menus)
	return (
		<>
			<div className="row">
				<div className="mobile-menu-wrap" /* ref={domNode} */>
					<div className="">
						{/*<li onClick={(e) => selectCategory(e, "")}> <a>{menuDatas.d_title}</a> </li>*/}

						{menusArray?.map((li, index) => {
							return (
								<li
									key={index}
									className={
										li.d_title === menuDatas.d_title
											? "menu-item-has-children active " + styles.menuitem
											: "menu-item-has-children " + styles.menuitem
									}
								>
									<Link
										href={{ pathname: "/products/plist", query: { id: li.d_id,page:1 } }}
										replace
										shallow={false}
										//href=""
										//onClick={handleCat("/products/plist",li.d_id)}
										//as={`/products/products_list/${li.d_id}`}
									>
										{li.d_title}
									</Link>
									<span className="menu-expand" onClick={() => handleToggle(index)}>
										{li?.Subdata?.length > 0 && <i className="fi-rs-angle-small-down"></i>}
									</span>
									{li?.Subdata && (
										<ul className={isActive.key == index ? "dropdown" : "d-none"}>
											{li?.Subdata?.map((ul, index) => {
												return (
													<li key={index} className={styles.li}>
														<Link
															href={{ pathname: "/products/plist", query: { id: ul.d_id,page:1 } }}
															replace
															shallow={false}
															//as={`/products/products_list/${li.d_id}`}
															//onClick={handleCat("/products/plist",ul.d_id)}
														>
															{ul.d_title}
														</Link>
														{/* <i className="fi-rs-angle-right"></i> */}
													</li>
												)
											})}
										</ul>
									)}
								</li>
							)
						})}
					</div>
				</div>
				<div className="">
					<Tags />
				</div>
			</div>
		</>
	)
}

export default connect(null, { updateProductCategory })(CategoryProduct)
