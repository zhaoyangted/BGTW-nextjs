import { connect } from "react-redux"
import Layout from "../components/layout/Layout"
import styles from "../components/account.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import {
	clearCart,
	closeCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
	openCart,
} from "../redux/action/cart"
import { relative } from "path"

const Cart = ({
	openCart,
	cartItems,
	activeCart,
	closeCart,
	increaseQuantity,
	decreaseQuantity,
	deleteFromCart,
	clearCart,
}) => {
	const price = () => {
		let price = 0
		cartItems.forEach((item) => (price += item.d_price * item.quantity))
		/* if (apiData?.OneFreight?.d_freight) {console.log(price);
        return price+parseInt(apiData?.OneFreight?.d_freight) }
        else {console.log(price);return price} */
		return price
	}
	const router=useRouter()
	const [apiData, setApiData] = useState({})
	const [numErr,setNumErr] = useState(false)
	useEffect(() => {
		const point = async () => {
			let str = ""
			cartItems?.map((p, i) => {
				p.d_id ? (str = str + p.d_id + "@#" + p.quantity + "@#;") : null
			})
			str = str.replace(/;\s*$/, "")
			const res = await axios.post(
				process.env.apiServer + "/api/cart/cart/",
				{
					cart: str,
				},
				{ credentials: "include" }
			)
			setApiData(res.data)
			//return res.data['BonusTotal']
		}
		point()
	}, [cartItems])
	const handleCheckout =() =>{
		!numErr &&  router.push("/checkout")
	}
	return (
		<>
			<Layout parent="首頁" sub=" 購物車" /* subChild="" */>
				<section className={styles.content_box}>
					<div className="container">
						<section className="content_box">
							<div className="col-lg- mb-40">
								<h1 className={styles.title01}>購物清單</h1>
								<div className="d-flex justify-content-between">
									<h6 className="text-body">
										購物車有 <span className="text-brand">{cartItems.length}</span> 件商品
									</h6>
									<h6 className="text-body">
										<a onClick={clearCart} className="text-muted">
											<i className="fi-rs-trash mr-5"></i>
											清空購物車
										</a>
									</h6>
								</div>
							</div>
						</section>
						<div className={styles.cart01}>
							<div className="col-lg-">
								{cartItems.length <= 0 && "No Products"}

								<div className={styles.titlebox}>
									<div className={styles.name}>商品</div>
									<div className={styles.number}>數量</div>
									<div className={styles.price}>小計</div>
									<div className={styles.del}></div>
								</div>
								{cartItems.map((item, i) => {
									//console.log(item)
									return (
										<ul
											key={i}
											className={
												item.d_stock <= 0 || (!item.AddDate?.Chkop && item.AddDate?.Chkop === "N") ? "stock_btn" : ""
											}
										>
											{item.stock <= 0 ? setNumErr(true) && (
												<div className={styles.stock}>
													<span>目前無庫存</span>
												</div>
											) : (
												!item.AddDate?.Chkop &&
												item.AddDate?.Chkop === "N" && (
													<div className={styles.stock}>
														<span>
															目前商品選配：{item.AddData?.AddTitle}
															庫存剩餘：{item.AddData?.Addstock}
														</span>
													</div>
												)
											)}
											<div className={styles.namebox}>
												<div className={styles.name}>
													<dd>
														<Link href={{ pathname: "/products/info/", query: { id: item.d_id } }}>
															<img src={process.env.s3Host + item.d_img1} alt="" />
														</Link>
													</dd>
													<dt>
														<div className={styles.tt}>
															<Link href={{ pathname: "/products/info", query: { id: item.d_id } }}>
																{item.d_title}
															</Link>
														</div>
														<div className={styles.sbox}>
															<div className={styles.dtt}>商品編號</div>
															<div className={styles.spec}>{item.d_model}</div>
														</div>
														<div className={styles.sbox}>
															<div className={styles.dtt}>單價</div>
															<div className={styles.spec}>
																<span>
																	NT$
																	{item.d_price}
																</span>
															</div>
														</div>
														{item.AddData && (
															<div className={styles.sbox}>
																<div className={styles.dtt}>商品選配</div>
																<div className={styles.spec}>
																	{item.AddData.AddTitle + ":" + "NT$" + item.AddData.AddPrice}
																</div>
															</div>
														)}
													</dt>
												</div>
											</div>
											<div className={styles.numberbox}>
												<div className={styles.number}>
													<div className={styles.quantity + " " + styles.buttons_added}>
														<a onClick={(e) => decreaseQuantity(item.d_id)} className="qty-down">
															<i className="fi-rs-angle-small-down"></i>
														</a>
														<span className="qty-val">{item.quantity}</span>
														<a onClick={(e) => increaseQuantity(item.d_id)} className="qty-up">
															<i className="fi-rs-angle-small-up"></i>
														</a>
													</div>
												</div>
												<div className={styles.price}>
													<span>NT${item.quantity * item.d_price}</span>
												</div>
												<div className={styles.del}>
													<a onClick={(e) => deleteFromCart(item.d_id)} className="text-muted">
														<i className="fi-rs-trash"></i>
													</a>
												</div>
											</div>
										</ul>
									)
								})}
								{apiData.AddData?.map((a, i) => {
									return (
										<ul key={i}>
											<div className={styles.namebox}>
												<div className={styles.name}>
													<dd>
														<img src={process.env.s3Host + a.d_img} alt="" />
													</dd>
													<dt>
														<div className={styles.tt}>{a.d_title}</div>
														<div className={styles.sbox}>
															<div className={styles.dtt}>加購價</div>
															<div className={styles.spec}>
																<span>
																	NT$
																	{a.d_price}
																</span>
															</div>
														</div>
													</dt>
												</div>
											</div>
											<div className={styles.numberbox}>
												<div className={styles.number}>1</div>
												<div className={styles.price}>
													NT$
													{a.d_price}
												</div>
												<div className={styles.del}>
													<a onClick={(e) => deleteFromCart(a.d_id)} className="text-muted">
														<i className="fi-rs-trash"></i>
													</a>
												</div>
											</div>
											<div className={styles.salesbox}>
												<div className={styles.slist}>
													<div className={styles.sales}>加購價產品</div>
												</div>
											</div>
										</ul>
									)
								})}
								{apiData.TrialData?.map((t, i) => {
									return (
										<ul key={i} className={t.d_stock <= 0 ? styles.stock_btn : ""}>
											{t.d_stock <= 0 && (
												<div className={styles.stock}>
													<span>目前無庫存</span>
												</div>
											)}
											<div className={styles.namebox}>
												<div className={styles.name}>
													<dd>
														<img src={process.env.s3Host + t.d_img} alt="" />
													</dd>
													<dt>
														<div className={styles.tt}>{t.d_title}</div>
														<div className={styles.sbox}>
															<div className={styles.dtt}>商品編號</div>
															<div className={styles.spec}>{t.d_model}</div>
														</div>
													</dt>
												</div>
											</div>
											<div className={styles.numberbox}>
												<div className={styles.number}>1</div>
												<div className={styles.price}>---</div>
												<div className={styles.del}>
													<a onClick={(e) => deleteFromCart(t.d_id)} className="text-muted">
														<i className="fi-rs-trash"></i>
													</a>
												</div>
											</div>
											<div className={styles.salesbox}>
												<div className={styles.slist}>
													<div className={styles.slist}>試用品</div>
												</div>
											</div>
										</ul>
									)
								})}
								<div className="cart-action text-end">
									<a className="btn ">
										<i className="fi-rs-shopping-bag mr-10"></i>
										繼續購物
									</a>
								</div>
								<div className="divider center_icon mt-50 mb-50">
									<i className="fi-rs-fingerprint"></i>
								</div>
								<div className="row mb-50">
									<div className="col-lg-6 col-md-12">
										<div className="mb-30 mt-50">
											<div className="heading_s1 mb-3">{/* <h4>Apply Coupon</h4> */}</div>
											<div className="total-amount">
												<div className="left">
													{/* <div className="coupon">
                                                    <form
                                                        action="#"
                                                        target="_blank"
                                                    >
                                                        <div className="form-row row justify-content-center">
                                                            <div className="form-group col-lg-6">
                                                                <input
                                                                    className="font-medium"
                                                                    name="Coupon"
                                                                    placeholder="Enter Your Coupon"
                                                                />
                                                            </div>
                                                            <div className="form-group col-lg-6">
                                                                <button className="btn  btn-sm">
                                                                    <i className="fi-rs-label mr-10"></i>
                                                                    Apply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-md-12">
										<div className="border p-md-4 p-30 border-radius cart-totals">
											<div className="heading_s1 mb-3">
												<h4>購物車小計</h4>
											</div>
											<div className="table-responsive">
												<table className="table">
													<tbody>
														<tr>
															<td className="cart_total_label">小計</td>
															<td className="cart_total_amount">
																<span className="font-lg fw-900 text-brand">$ {price()}</span>
															</td>
														</tr>
														<tr>
															<td className="cart_total_label">一般運費</td>
															<td className="cart_total_amount">
																<i className="ti-gift mr-5"></i>
																{apiData?.OneFreight?.d_freight}
															</td>
														</tr>
														<tr>
															<td className="cart_total_label">大型運費</td>
															<td className="cart_total_amount">
																<i className="ti-gift mr-5"></i>
																{apiData?.BigFreight}
															</td>
														</tr>
														<tr>
															<td></td>
															<td className="cart_total_label">
																訂單小計滿{apiData?.OneFreight?.d_free}元，免一般運費
															</td>
														</tr>
														<tr>
															<td className="cart_total_label">小計</td>
															<td className="cart_total_amount">
																<strong>
																	<span className="font-xl fw-900 text-brand">
																		${price() + parseInt(apiData?.OneFreight?.d_freight)}
																	</span>
																</strong>
															</td>
														</tr>
														<tr>
															<td className="cart_total_label">本次訂單累計紅利</td>
															<td className="cart_total_amount">
																<strong>
																	<span className="font-xl fw-900 text-brand">{apiData?.BonusTotal}</span>
																</strong>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<a  className="btn " onClick={handleCheckout}>
												<i className="fi-rs-box-alt mr-10"></i>
												結帳
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}

const mapStateToProps = (state) => ({
	cartItems: state.cart,
	activeCart: state.counter,
})

const mapDispatchToProps = {
	closeCart,
	increaseQuantity,
	decreaseQuantity,
	deleteFromCart,
	openCart,
	clearCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
