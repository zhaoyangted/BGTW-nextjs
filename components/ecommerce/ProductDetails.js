import { useState } from "react"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import { addToCart, decreaseQuantity, increaseQuantity } from "../../redux/action/cart"
import { addToCompare } from "../../redux/action/compareAction"
import { addToWishlist } from "../../redux/action/wishlistAction"
import ProductTab from "../elements/ProductTab"
import RelatedSlider from "../sliders/Related"
import ThumbSlider from "../sliders/Thumb"
import styles from "../product.module.css"
import Link from "next/link"
const ProductDetails = ({
	product,
	cartItems,
	addToCompare,
	addToCart,
	addToWishlist,
	increaseQuantity,
	decreaseQuantity,
	quickView,
	img,
	specData,
	watchedData,
	spec,
}) => {
	const [quantity, setQuantity] = useState(1)
	const [info, setInfo] = useState(product?.d_id)
	// console.log(specData)
	const handleCart = (product) => {
		addToCart(product)
		toast("已加入購物車 !")
	}

	const handleCompare = (product) => {
		addToCompare(product)
		toast("加入比較 !")
	}

	const handleWishlist = (product) => {
		addToWishlist(product)
		toast("加入願望清單 !")
	}
	const handleChange = (e) => {
		e.preventDefault
		const fieldName = e.target?.name
		const fieldValue = e.target?.value
		setInfo(fieldValue)
		spec(fieldValue)
	}
	const inCart = cartItems.find((cartItem) => cartItem.id === product?.d_id)
	const inStock = parseInt(product?.d_stock) - quantity >= 0
	//console.log(product.d_price)
//console.log(info)
	return (
		<>
			<section className="col-xl-10 col-lg-12 col-12 mb-md-0 mb-sm-5">
				{/* <div className="container"> */}
					<div className="row flex-row-reverse">
						{/* <div className="col-xl-10 col-lg-12 col-xs-12 m-auto"> */}
							<div className="product-detail accordion-detail">
								<div className="row mb-50  mt-30">
									<div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
										<div className="detail-gallery">
											{/* <span className="zoom-icon">
												<i className="fi-rs-search"></i>
											</span> */}

											<div className="product-image-slider">
												<ThumbSlider img={img} />
											</div>
										</div>
									</div>
									<div className="col-md-6 col-sm-12 col-xs-12">
										<div className={styles.detailinfo}>
											{product?.d_stock === 0 && <span className="stock-status out-stock"> 無庫存 </span>}
											<h2 className={styles.titledetail}>{product?.d_title}</h2>
											<ul className={styles.productmeta}>
												{product?.pbtitle ? (
													<li>
														<div className={styles.dtt}>商品品牌</div>
														<div className={styles.spec}>
															<Link href={"/products/blist?id=" + product?.BID+"/"}>{product.pbtitle}</Link>
														</div>
													</li>
												) : null}
												{product?.d_model ? (
													<li>
														<div className={styles.dtt}>商品編號</div>
														<div className={styles.spec}>{product?.d_model}</div>
													</li>
												) : null}
												{product?.d_stock ? (
													<li>
														<div className={styles.dtt}>庫存數量</div>
														<div className={styles.spec}>
															<span className="in-stock text-success">{product?.d_stock}</span>
														</div>
													</li>
												) : null}
												{product?.d_free ? (
													<li>
														<div className={styles.dtt}>運費</div>
														<div className={styles.spec}>
															<span className="in-stock text-success">
																{product?.d_free !== "0" ? `訂單滿NT${product?.d_free}免運費` : `免運費`}
															</span>
														</div>
													</li>
												) : null}
											</ul>
											<ul className={styles.productmeta}>
												{product?.Chked === "Y" ? (
													product?.isNotAvail !== "" ? (
														<>
															<li className="mb-5">
																<div className={styles.dtt}>{product?.isMember}:</div>
																<div className={styles.spec}>NT${product?.d_price}</div>
															</li>
															<li className="mb-5">
																<div className={styles.dtt}>{product?.isNotAvail}</div>
																<div className={styles.spec}>資格不符</div>
															</li>
														</>
													) : (
														<li className="mb-5">
															<div className={styles.dtt}>{product?.isMember}:</div>
															<div className={styles.spec}>NT${product?.d_price}</div>
														</li>
													)
												) : (
													<li className="mb-5">
														<div className={styles.dtt}>市價</div>
														<div className={styles.spec}>NT${product?.d_price}</div>
													</li>
												)}
												{product?.d_dprice != 0 ? (
													<li className="mb-5">
														<div className={styles.dtt}>出清價</div>
														<div className={styles.spec}>NT${product?.d_dprice}</div>
													</li>
												) : null}
												{product?.d_sprice != 0 ? (
													<li className="mb-5">
														<div className={styles.dtt}>促銷價</div>
														<div className={styles.spec}>NT${product?.d_sprice}</div>
													</li>
												) : null}
												{product?.isSalePrice ? (
													<li className="mb-5">
														<div className={styles.dtt}>特價</div>
														<div className={styles.spec}>NT${product?.isSalePrice}</div>
													</li>
												) : null}
												{product?.isBonus ? (
													<li>
														<div className={styles.dtt}>
															<i className="fa fa-product-hunt" aria-hidden="true"></i>獲得紅利
														</div>
														<div className={styles.spec}>
															<span className="in-stock text-success">{product?.d_bonus}%</span>
														</div>
													</li>
												) : null}
											</ul>
											{specData || !quickView? (
												<ul className={styles.productmeta}>
													<div className={styles.dtt}>商品規格</div>
													<div className={styles.spec}>
														<select id="ChangeSpec" className="select_pd" name="spec" onChange={handleChange}>
															<option value={product?.d_id} >{product?.d_spectitle}</option>
															{specData?.map((clr, i) => (
																<option key={i} value={clr.d_id}>
																	{clr.d_spectitle}
																</option>
															))}
														</select>
													</div>
												</ul>
											) : null}

											{/* <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                <span className="current-price  text-brand">${product.d_price}</span>
                                                <span>
                                                <span className="save-price font-md color3 ml-15">{product.d_dPrice/product.d_price*100}% Off</span>
                                                <span className="old-price font-md ml-15">{product.d_dPrice ? `$ ${product.d_sPrice}` : null}</span>
                                                </span>
                                                </div>
                                            </div> */}

											{/* <div className="short-desc mb-30">
                                                <p className="font-lg">{product.d_title}</p>
                                            </div> */}

											{/* 	<div className="attr-detail attr-size">
												<strong className="mr-10">Size</strong>
												<ul className="list-filter size-filter font-small">
													<li className="active">
														<a>M</a>
													</li>
													<li>
														<a>L</a>
													</li>
													<li>
														<a>XL</a>
													</li>
													<li>
														<a>XXL</a>
													</li>
												</ul>
											</div> */}
											<div className="product-detail-rating">
												<div className="product-rate-cover text-end">
													{/* <div className="product-rate d-inline-block">
														<div className="product-rating" style={{ width: "90%" }}></div>
													</div>
													<span className="font-small ml-5 text-muted"> (32 reviews)</span> */}
												</div>
											</div>
											<div className="bt-1 border-color-1 mt-30 mb-30"></div>

											<div className="detail-extralink">
												<div className="detail-qty border radius">
													<a
														onClick={(e) =>
															!inCart ? setQuantity(quantity > 1 ? quantity - 1 : 1) : decreaseQuantity(product?.d_id)
														}
														className="qty-down"
													>
														<i className="fi-rs-angle-small-down"></i>
													</a>
													<span className="qty-val">{inCart?.quantity || quantity}</span>
													<a
														onClick={() =>
															!inCart && parseInt(product?.d_stock) - quantity > 0
																? setQuantity(quantity + 1)
																: increaseQuantity(product?.d_id)
														}
														className="qty-up"
													>
														<i className="fi-rs-angle-small-up"></i>
													</a>
												</div>
											</div>
											<div className="detail-extralink">
												<div className="product-extra-link2">
													<button
														onClick={(e) =>
															parseInt(product?.d_stock) - quantity > 0
																? handleCart({
																		...product,
																		quantity: quantity || 1,
																  })
																: null
														}
														className="button button-add-to-cart"
													>
														{parseInt(product?.d_stock) - quantity >= 0 ? "加入購物車" : "無庫存"}
													</button>
													<a
														aria-label="Add To Wishlist"
														className="action-btn hover-up"
														onClick={(e) => handleWishlist(product)}
													>
														<i className="fi-rs-heart"></i>
													</a>
													<a
														aria-label="Compare"
														className="action-btn hover-up"
														onClick={(e) => handleCompare(product)}
													>
														<i className="fi-rs-shuffle"></i>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>

								{quickView ? null : (
									<>
										<ProductTab product={product} />
										<div className="row mt-60">
											<div className="col-12">
												<h3 className="section-title style-1 mb-30">最近瀏覽商品</h3>
											</div>
											<div className="col-12">
												<div className="row related-products position-relative">
													<RelatedSlider product={watchedData} />
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						{/* </div> */}
					</div>
				{/* </div> */}
			</section>
		</>
	)
}

const mapStateToProps = (state) => ({
	cartItems: state.cart,
})

const mapDispatchToProps = {
	addToCompare,
	addToWishlist,
	addToCart,
	increaseQuantity,
	decreaseQuantity,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
