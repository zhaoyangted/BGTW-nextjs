import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
//import Breadcrumb2 from "../../components/layout/Breadcrumb2"
import { addToCart } from "../../redux/action/cart"
//import Pagination from "../../components/ecommerce/Pagination"
import Layout from "../../components/layout/Layout"
import { fetchMoreProduct } from "../../redux/action/product"
//import ProductMore from "../../components/ecommerce/ProductMore"
import styles from "../../components/pmore.module.css"
import Link from "next/link"
const ProductsMore = ({ products, cartItems, fetchMoreProduct, addToCart }) => {
	let Router = useRouter()
	const { id } = Router.query
	const handleCart = async (e) => {
		e.preventDefault()
		//console.log(quantity)
		const quant = Object.fromEntries(quantity)
		//console.log(quant)
		Object.keys(quant).map((key) => {
			//console.log(key)
			if (quant[key] > 0) {
				//console.log({ d_id: key}, quant[key])
				let pro = products.vars.find((item) => item.d_id === key)
				addToCart(pro, quant[key])
			}
		})
		//toast("已加入購物車 !")
	}
	const [quantity, setQuantity] = useState(new Map())
	const updateMap = (k, v) => {
		setQuantity((prev) => new Map(prev).set(k, v))
	}
	//const inCart = cartItems.find((cartItem) => cartItem.id === product?.d_id)
	useEffect(() => {
		if (!Router.isReady) {
			return
		}
		fetchMoreProduct(process.env.apiServer + `/api/product/productsMore/${id}`)
	}, [id])
	useEffect(() => {
		products?.vars?.map((item, i) => {
			updateMap(item.d_id, 0)
		})
	}, [products])
	//console.log(quantity)
	return (
		<div>
			<Layout parent="主頁" subChild={products?.Menutitle}>
				<div className={styles.box_1}>
					<section className={styles.content_box}>
						<div className={styles.products_more}>
							<div style={{ display: "inline-flex" }}>
								<div className={styles.toppic}>
									<img src={process.env.s3Host + products?.var?.d_img1} alt="" />
								</div>
								<div className={styles.toppic}>
									<h4>{products?.var?.d_title}</h4>
								</div>
							</div>
							<ul>
								{products?.vars?.map((item, i) => (
										<li key={i}>
											<div className={styles.name}>
												<Link href={"/products/info/?id=" + item.d_id}> {item.d_title}</Link>
											</div>
											<div className={styles.pic}>
												<Link href={"/products/info/?id=" + item.d_id}>
													<img src={process.env.s3Host + item.d_img1} alt="" />
												</Link>
											</div>
											<div className={styles.info_list}>
												<div className={styles.dtt}>庫存數量</div>
												<div className={styles.spec} style={{ color: item.d_stock > 0 ? null : "red" }}>
													{item.d_stock > 0 ? item.d_stock : "補貨中"}
												</div>
											</div>
											{item.Discount !== 0 && item.d_sprice !== 0 ? (
												<div className={styles.info_list}>
													<div className={styles.dtt}>特價</div>
													<div className={styles.spec}>NT${item.d_price}</div>
												</div>
											) : item.d_dprice !== 0 && item.Discount !== 0 ? (
												<div className={styles.info_list}>
													<div className={styles.dtt}>出清價</div>
													<div className={styles.spec}>NT${item.d_dprice}</div>
												</div>
											) : item.d_sprice !== 0 && item.Discount !== 0 ? (
												<div className={styles.info_list}>
													<div className={styles.dtt}>促銷價</div>
													<div className={styles.spec}>NT${item.d_sprice}</div>
												</div>
											) : item.Chked === "Y" ? (
												<div className={styles.info_list}>
													<div className={styles.dtt}>{item.Lvtitle}</div>
													<div className={styles.spec}>NT${item.d_price}</div>
												</div>
											) : (
												<div className={styles.info_list}>
													<div className={styles.dtt}>市價</div>
													<div className={styles.spec}>NT${item.d_price1}</div>
												</div>
											)}
											<div className={styles.info_list}>
												<div className={styles.dtt}>數量</div>
												<div className={styles.spec}>
													<div className={styles.buttons_added}>
														<input
															type="button"
															value="-"
															readOnly
															disabled={item.d_stock === 0}
															className={styles.minus}
															onClick={(e) => {
																//console.log(quantity[item.d_id])
																updateMap(item.d_id, quantity?.get(item.d_id) > 0 ? quantity.get(item.d_id) - 1 : 0)
															}}
														/>
														<input
															type="number"
															name={"d_num_" + item.d_id}
															title="Qty"
															//readOnly
															value={quantity.get(item.d_id)||0}
															//onChange={(e)=>quantity.get(item.d_id)}
															className={styles.input_text}
															style={{ color: item.d_stock > 0 ? "black" : "grey" }}
															size="4"
														/>
														<input
															type="button"
															readOnly
															value="+"
															disabled={item.d_stock === 0}
															className={styles.plus}
															onClick={(e) => {
																//console.log(quantity[item.d_id])
																updateMap(
																	item.d_id,
																	item.d_stock > quantity.get(item.d_id)
																		? quantity?.get(item.d_id) + 1
																		: quantity?.get(item.d_id)
																)
															}}
														/>
													</div>
												</div>
											</div>
										</li>
								))}
							</ul>
							<div id="sticker" className={styles.buyicon}>
								<a href="" className={styles.btn_style09} id="AddCart" onClick={(e) => handleCart(e)}>
									加入購物車
								</a>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		</div>
	)
}

const mapStateToProps = (state) => ({
	products: state.products,
	//vars:state.products.vars,
	/* sortData: state.sorts,
	typeData: state.types,
	productFilters: state.productFilters, */
})

const mapDidpatchToProps = {
	// openCart,
	addToCart,

	//fetchProduct,
	fetchMoreProduct,
}

export default connect(mapStateToProps, mapDidpatchToProps)(ProductsMore)
