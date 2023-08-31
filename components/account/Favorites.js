import React from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag, faTimes } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import { addToCart } from "../../redux/action/cart"
import { deleteFromWishlist } from "../../redux/action/wishlistAction"
const Favorites = ({ product, addToCart, deleteFromWishlist }) => {
	const handleCart = (product) => {
		addToCart(product)
		toast("Product added to Cart !")
	}

	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/favorite", fetcher)
	//console.log(data.dbdata.dbdata)
	const getAdd = (str) => {
		let Add_title = p.d_add_title.split(",")
		let Add_price = p.d_add_price.split(",")
		let Add_id = p.d_add_id.split(",")
		let Add_stock = p.d_add_stock.split(",")
		let Add_enable = p.d_add_enable.split(",")
	}
	return (
		<>
			<section className="content_box">
				<div className={styles.favorite}>
					<div className="titlebox">商品</div>
					{data &&
						data?.dbdata?.dbdata.map((p, i) => {
							if (p.d_add_id) {
								let Add_title = p.d_add_title.split(",")
								let Add_price = p.d_add_price.split(",")
								let Add_id = p.d_add_id.split(",")
								let Add_stock = p.d_add_stock.split(",")
								let Add_enable = p.d_add_enable.split(",")
							}
							return (
								<ul key={i}>
									<div className={styles.namebox}>
										<div className={styles.name}>
											<dd>
												<a href={"products/" + p.d_id}>
													<img src={process.env.s3Host + p.d_img1} />
												</a>
											</dd>
											<dt>
												<div className={styles.tt}>
													<a href={"/products/" + p.d_id} target="_blank">
														{p.d_title}
													</a>
												</div>
												<div className={styles.sbox}>
													<div className={styles.dtt}>商品編號</div>
													<div className={styles.spec}>{p.d_model}</div>
												</div>
												<div className={styles.sbox}>
													<div className={styles.dtt}>商品規格</div>
													<div className={styles.spec}>{p.d_spectitle}</div>
												</div>
												<div className={styles.sbox}>
													<div className={styles.dtt}>{data?.dbdata.lvtitle}</div>
													<div className={styles.spec}>
														<span>
															NT$
															{p.d_pro_price}
														</span>
													</div>
												</div>
												<div className={styles.sbox}>
													<div className={styles.dtt}>商品加購</div>
													<div className={styles.spec}>
														{p.d_add_id ? (
															<select className="select_pd">
																<option>請選擇</option>
																{Add_id?.map((a, i) => {
																	return (
																		Add_stock[i] > 0 &&
																		Add_enable[i] === "Y" && (
																			<option
																				value={Add_id[i]}
																				selected={data?.AID[p.d_id] && data?.AID[p.d_id] === Add_id[$i]}
																			>
																				{" "}
																				{Add_title[i]}
																			</option>
																		)
																	)
																})}
															</select>
														) : (
															"無"
														)}
													</div>
												</div>
											</dt>
										</div>
									</div>
									<div className={styles.numberbox}>
										<div className={styles.del}>
											<a href="#" onClick={() => deleteFromWishlist(p.d_id)} className="btn_style06">
												<FontAwesomeIcon icon={faTimes} size="lg" />
												{/* <i className="fas fa-times"></i> */}
												<span>刪　　除</span>
											</a>
											<a href="#" rel={p.d_id} onClick={() => handleCart(p)} className="btn_style06">
												<FontAwesomeIcon icon={faShoppingBag} size="lg" />
												{/* <i className="fas fa-shopping-bag"></i> */}
												<span>加入購物</span>
											</a>
										</div>
									</div>
								</ul>
							)
						})}
				</div>
			</section>
			{data?.dbdata?.dbdata ? <div dangerouslySetInnerHTML={{ __html: data?.dbdata?.PageList }}></div> : ""}
		</>
	)
}
const mapDispatchToProps = {
	addToCart,
	deleteFromWishlist,
}
export default connect(null, mapDispatchToProps)(Favorites)
