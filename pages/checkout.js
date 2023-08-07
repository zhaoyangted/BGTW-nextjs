import { connect } from "react-redux"
import Layout from "../components/layout/Layout"
import styles from "../components/account.module.css"
import { useState, useEffect, useRef, useCallback } from "react"
import axios from "axios"
import TWzipcode from "react-twzipcode"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import {
	clearCart,
	closeCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
	openCart,
} from "../redux/action/cart"

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
	/* const price = () => {
		let price = 0
		cartItems.forEach((item) => (price += item.price * item.quantity))

		return price
	} */
	const [apiData, setApiData] = useState({})
	const freightRef = useRef(0)
	const bigFreightRef = useRef(0)
	const outFreightRef = useRef('1')
	const bonusRef = useRef(0)
	const totalRef = useRef(0)
    const router = useRouter()
	useEffect(() => {
        const point = async () => {
            let str = ""
			cartItems?.map((p, i) => {
                p.d_id ? (str = str + p.d_id + "@#" + p.quantity + "@#;") : null
			})
			str = str.replace(/;\s*$/, "")
            setFormData((prevState) => ({
                ...prevState,
                'cart':str,
            })
            )
			const res = await axios.post(process.env.apiServer + "/api/cart/cart_info/", {
                cart: str,
			})
			setApiData(res.data)
			//return res.data['BonusTotal']
		}
		point()
	}, [cartItems])
    const [formData, setFormData] = useState({
        SubBonus: 0,
        d_donate:"",
        d_cname:"",
        d_invoice:"",
        d_othername:"",
        d_icname:"",
        d_iaddress:"",
        d_Invoicecity:"",
        d_Invoicearea:"",
        d_Invoicezip:"",
        d_ium:"",
        /* d_cname:apiData?.Mdata?.d_company_title ? apiData?.Mdata?.d_company_title : "",
        d_name:apiData?.Mdata?.d_pname ? apiData?.Mdata?.d_pname : "",
        d_mobile:apiData?.Mdata?.d_phone ? apiData?.Mdata?.d_phone : "",
        d_phone:apiData?.Mdata?.d_company_tel ? apiData?.Mdata?.d_company_tel : "",
        d_email:apiData?.Mdata?.d_account ? apiData?.Mdata?.d_account : "",
        d_address:apiData?.Mdata?.d_address ? apiData?.Mdata?.d_address : "", */
    })
	const handlePesChange = ({ county, district, zipcode }) => {
        //console.log(data)
		setFormData((prevState) => ({
            ...prevState,
			d_city: county || "",
			d_area: district || "",
			d_zip: zipcode || "",
		}))
	}
	const handleComChange = ({ county, district, zipcode }) => {
        //console.log(data)
		setFormData((prevState) => ({
            ...prevState,
			d_Invoicecounty: county || "",
			d_Invoicedistrict: district || "",
			d_Invoicezipcode: zipcode || "",
		}))
	}
	const handleInput = (e) => {
        //console.log(e.targe?.name)
        
		e.preventDefault
		const fieldName = e.target?.name
		const fieldValue = e.target?.value
        
		setFormData((prevState) => ({
            ...prevState,
			[fieldName]: fieldValue || "",
		}))
		//console.log(formData)
	}
	
    const handleTotal = useCallback(() => {
        let total = 0;
        total =
        parseInt(apiData?.CartProduct?.Total) -
        parseInt(bonusRef.current.value) +
        parseInt(apiData?.CartProduct?.BigFreight) +
        parseInt(apiData?.CartProduct?.Total < "2500" ? apiData?.CartProduct?.Freight : "0") +
        //parseInt(/* freightRef.current.value */fre) 
        +
        (formData?.d_logistics==='2'?apiData?.CartProduct?.Outisland:0)
        //parseInt(/* outFreightRef.current.value */outf)
		/* setFormData((prevState) => ({
            ...prevState,
			AllTotal: total,
		})) */
		//console.log(bigFreightRef.current.value)
		return total
	},[formData])
	//console.log(apiData?.CartProduct?.Total)
	console.log(formData)
	const submitForm = async (e) => {
		// We don't want the page to refresh
		e.preventDefault()
		//console.log(e.target.action)
        if (!formData?.d_backagree==="Y")
        {
            toast("請勾選");
            return;
        }

		const formURL = e.target.action
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(formData).forEach(([key, value]) => {
			data.append(key, value)
		})

		// POST the data to the URL of the form
		await axios
			.post(formURL, data, { credentials: "include" })
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
	}
	return (
		<>
			<Layout parent="首頁" /* sub="Shop" */ subChild=">結帳">
				<form action={process.env.apiServer + "/api/cart/addorder"} method="post" onSubmit={submitForm}>
					{/* <section className="mt-50 mb-50">
						<div className="container">
							<div className="row">
								<div className="col-lg-8 mb-40">
									<h1 className="heading-2 mb-10"></h1>
									<div className="d-flex justify-content-between">
										<h6 className="text-body">
											共有 <span className="text-brand">{apiData?.CartProduct?.Cart?.length}</span> 商品在購物車中
										</h6>
									</div>
								</div>
							</div>
						</div> */}
					<div className="container">
						<div className="col-lg-12">
							<section className={styles.content_box}>
								<div className={styles.title01}>填寫訂購資訊</div>
								<div className={styles.cart02}>
									<div className={styles.titlebox}>
										<div className={styles.name}>商品</div>
										<div className={styles.number}>數量</div>
										<div className={styles.price}>小計</div>
									</div>
									{apiData?.CartProduct?.Cart?.map((item, i) => {
										//console.log(i)
										return (
											<ul key={i}>
												<div className={styles.namebox}>
													<div className={styles.name}>
														<dd>
															<a href={"/products/" + item.d_id}>
																<img src={"/"+item.d_img1} alt="" />
															</a>
														</dd>
														<dt>
															<div className={styles.tt}>
																<a href={"/products/" + item.d_id}>{item.d_title}</a>
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
															{item.AddData ? (
																<div className={styles.sbox}>
																	<div className={styles.dtt}>商品加購</div>
																	<div className={styles.spec}>
																		{item.AddData.AddTitle + "NT$" + item.AddData.AddPrice}
																	</div>
																</div>
															) : null}
														</dt>
													</div>
												</div>
												<div className={styles.numberbox}>
													<div className={styles.number}>{item.num}</div>
													
													<div className={styles.price}>{item.d_total}</div>
												</div>
												{item.IsSale ? (
													<div className="salesbox">
														<div className="slist">
															<div className="icon">
																<span className="icon_ok">符合</span>
															</div>
															<div className={styles.sales}>
																<a href={"/products/sales/" + item.d_id} target="_blank">
																	{/*  <?php echo $this->autoful->DiscountData[$value['d_id']]['d_title'] ?>*/}
																</a>
															</div>
														</div>
													</div>
												) : null}
											</ul>
										)
									})}

									{apiData?.CartProduct?.AddData
										? apiData?.CartProduct?.AddData?.map((item, i) => {
												return (
													<ul key={i}>
														<div className="namebox">
															<div className="name">
																<dd>
																	<img src={"/"+item.d_img} alt="" />
																</dd>
																<dt>
																	<div className="tt">{item.d_title}</div>
																	<div className="sbox">
																		<div className="dtt">加購價</div>
																		<div className="spec">
																			<span>
																				NT$
																				{item.d_price}
																			</span>
																		</div>
																	</div>
																</dt>
															</div>
														</div>
														<div className="numberbox">
															<div className="number">1</div>
															<div className="price">${item.d_price}</div>
														</div>
														<div className="salesbox">
															<div className="slist">
																<div className="slist">加購價產品</div>
															</div>
														</div>
													</ul>
												)
										  })
										: null}
									{apiData?.CartProduct?.TrialData
										? apiData?.CartProduct?.TrialData?.map((item, i) => {
												return (
													<ul key={i}>
														<div className="namebox">
															<div className="name">
																<dd>
																	<img src={"/"+item.d_img} alt="" />
																</dd>
																<dt>
																	<div className="tt">{item.d_title}</div>
																	<div className="sbox">
																		<div className="dtt">商品編號</div>
																		<div className="spec">{item.d_model}</div>
																	</div>
																</dt>
															</div>
														</div>
														<div className="numberbox">
															<div className="number">1</div>
															<div className="price">---</div>
														</div>
														<div className="salesbox">
															<div className="slist">試用品</div>
														</div>
													</ul>
												)
										  })
										: null}
									{apiData?.Gdata
										? apiData?.Gdata?.map((item, i) => {
												return (
													<ul key={i}>
														<div className="namebox">
															<div className="name">
																<dd>
																	<img src={"/" + item.d_img} alt="" />
																</dd>
																<dt>
																	<div className="tt">{item.d_title}</div>
																</dt>
															</div>
														</div>
														<div className="numberbox">
															<div className="number">1</div>
															<div className="price">---</div>
														</div>
														<div className="salesbox">
															<div className="slist">滿額贈品</div>
														</div>
													</ul>
												)
										  })
										: null}
									<div className={styles.cart_box_allsbox}>
										<div className={styles.cart_box}>
											<div className="sign_up_sexbar03">
												<div className="spcar_ck_tips">請選擇商品運送方式</div>
												<div className="off_cudinp_box">
													<div className="logistics_selection">
														<select
															id="sp3_t1"
															className={styles.sign_up_inpt}
															name="d_logistics"
															onChange={handleInput}
														>
															<option value="">請選擇運送方式</option>
															{apiData?.Ldata
																? apiData?.Ldata.map((item, i) => {
																		return (
																			<option value={item.d_id} key={i}>
																				{item.d_title}
																			</option>
																		)
																  })
																: null}
														</select>
													</div>
													{formData?.d_logistics ? (
														<div className={styles.spcar_ck_tips02}>
															宅配 NT$
															{apiData?.CartProduct?.OneFreight?.d_freight +
																"， 滿" +
																apiData?.CartProduct?.OneFreight?.d_free +
																"元免一般運費！請填寫您的收件資訊。"}
														</div>
													) : null}
													{formData?.d_logistics === "2" ? (
														<div className={styles.spcar_ck_tips02}>離島需另收物流費用，不適用於免運費優惠！</div>
													) : null}
												</div>
												<div className="spcar_ck_tips">請選擇付款方式</div>
												<div className="off_cudinp_box">
													<div className="logistics_selection">
														<select id="sp3_t2" className={styles.sign_up_inpt} name="d_pay" onChange={handleInput}>
															<option value="">請選擇付款方式</option>
															{apiData?.Pdata
																? apiData?.Pdata.map((item, i) => {
																		return (
																			<option value={item.d_id} key={i}>
																				{item.d_title}
																			</option>
																		)
																  })
																: null}
														</select>
													</div>
													{formData.d_pay ? (
														<div className={styles.spcar_ck_tips02}>
															{apiData?.Pdata[parseInt(formData.d_pay) - 2].d_content}
														</div>
													) : null}
												</div>
											</div>
										</div>
										<div className={styles.all02}>
											<div className={styles.cost}>
												<ul>
													<dd>小計</dd>
													<dt>${apiData?.CartProduct?.Total}</dt>
												</ul>

												{apiData?.Mdata && apiData.Mdata?.d_bonus !== 0 ? (
													<ul>
														<dd>{"可用紅利點數：" + apiData?.Mdata.d_bonus + "點"}</dd>
														<dt>
															<input
																className={styles.select_point}
																value={formData?.SubBonus}
																size="5"
																type="number"
																min="0"
																max={apiData?.Mdata?.d_bonus}
																id="SubBonus"
																name="SubBonus"
																ref={bonusRef}
																onChange={handleInput}
															/>
														</dt>
													</ul>
												) : null}
												<ul>
													<dd>大型運費</dd>
													<dt>${apiData?.CartProduct?.BigFreight}</dt>
													{/* <input
														hidden
														name="bigfreight"
														value={apiData?.CartProduct?.BigFreight}
														ref={bigFreightRef}
                                                        readOnly
														//onChange={handleInput}
													></input> */}
												</ul>
												<ul>
													<dd>一般運費</dd>
													<dt>${apiData?.CartProduct?.Total < "2500" ? apiData?.CartProduct?.Freight : "0"}</dt>
													{/* <input
														hidden
														name="freight"
														value={apiData?.CartProduct?.Total < "2500" ? apiData?.CartProduct?.Freight : "0"}
														ref={freightRef}
                                                        readOnly
														//onChange={handleInput}
													/> */}
												</ul>
												<ul>
													<dd>離島另收</dd>
													<dt>${formData?.d_logistics === "2" ? apiData?.CartProduct?.Outisland : 0}</dt>
													{/* <input
														hidden
														name="outislandfreight"
														value={formData?.d_logistics === "2" ? apiData?.CartProduct?.Outisland : 0}
														ref={outFreightRef}
                                                        readOnly
														onChange={handleInput}
													/> */}
												</ul>
												<ul>
													<h1>
														訂單小計滿<em>${apiData?.CartProduct?.OneFreight?.d_free}</em>元，免一般運費
													</h1>
												</ul>
												<div className="cart_line"></div>
												<ul>
													<dd>
														<b>總計</b>
													</dd>
													<dt>
														<span className={styles.txt_total} name="AllTotal" ref={totalRef}>
															${handleTotal(/* bonusRef.current.value,
                                                                bigFreightRef.current.value,
                                                                freightRef.current.value,
                                                                outFreightRef.current.value */)}
														</span>
                                                        <input
														hidden
														name="AllTotal"
														value={formData.AllTotal}
														ref={totalRef}
                                                        readOnly
														onChange={handleInput}
													    />
													</dt>
												</ul>
												<ul>
													<dd>
														<b>本次訂單累計紅利</b>
													</dd>
													<dt id="BonusTotal">${apiData?.CartProduct?.BonusTotal}</dt>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
					{/* </section> */}
					<div className={styles.gray_bg}>
						<div className="container">
							<div className="col-lg-">
								<div className={styles.content_box}>
									<div className={styles.cart_box02}>
										<div className={styles.title03}>收件人資料</div>
										{/* <div className={styles.join_line}></div> */}
										<div className={styles.add_box} style={{ width: "200px" }}>
											{/* <li style={{ textAlign: "center", width: "100%" }}>
												<a href="#add_info" className="fancybox" id="GetSend">
													選擇/管理 收件人通訊錄
												</a>
											</li> */}
										</div>
										<ul className={styles.styled_input}>
											<li className={styles.half}>
												<h2>公司大名</h2>
												<input
													type="text"
													name="d_cname"
                                                    defaultValue={apiData?.Mdata?.d_company_title ? apiData?.Mdata?.d_company_title : ""}
													value={formData?.d_cname}
                                                    //value={formData?.d_cname}
													onChange={handleInput}
												/>
											</li>
											<li className={styles.half}>
												<h2>收貨人姓名*</h2>
												<input
													type="text"
													name="d_name"
                                                    defaultValue={apiData?.Mdata?.d_name ? apiData?.Mdata?.d_name : ""}
													value={formData?.d_name}
													onChange={handleInput}
                                                    //value={formData?.d_name}
													required
												/>
											</li>
											<li className={styles.half}>
												<h2>手機號碼*</h2>
												<input
													type="text"
													name="d_moblie"
													required
                                                    defaultValue={apiData?.Mdata?.d_moblie ? apiData?.Mdata?.d_moblie : ""}
													value={formData?.d_moblie}
													onChange={handleInput}
                                                    //value={formData?.d_mobile}
													placeholder=""
												/>
											</li>
											<li className={styles.half}>
												<h2>市話</h2>
												<input
													type="text"
													name="d_phone"
                                                    defaultValue={apiData?.Mdata?.d_phone ? apiData?.Mdata?.d_phone : ""}
													value={formData?.d_phone}
                                                    //value={formData?.d_phone}
													onChange={handleInput}
												/>
											</li>
											<li>
												<h2>E-mail*</h2>
												<input
													type="text"
													name="d_email"
													required
                                                    defaultValue={apiData?.Mdata?.d_email ? apiData?.Mdata?.d_email : ""}
													value={formData?.d_email}
													onChange={handleInput}
                                                    //value={formData?.d_email}
													placeholder=""
												/>
											</li>
											<li>
												<h2>備註</h2>
												<textarea rows="5" name="d_content" onChange={handleInput}></textarea>
											</li>
											<li>
												<h2>地址*</h2>
												<div className={styles.mem_add}>
													<TWzipcode
														className={styles.mem_add}
														css={["mem_add_inpt county-sel", "mem_add_inpt district-sel", "mem_add_inpt zipcode"]}
														handleChangeCounty={handlePesChange}
														handleChangeDistrict={handlePesChange}
														handleChangeZipcode={handlePesChange}
														zipcodePlaceholder={"郵遞區號"}
														countyValue={/* apiData?.Mdata?.d_county?apiData?.Mdata?.d_county: */formData?.d_city}
														districtValue={/* apiData?.Mdata?.d_district?apiData?.Mdata?.d_district: */formData?.d_area}
														zipcodeValue={/* apiData?.Mdata?.d_zipcode?apiData?.Mdata?.d_zipcode: */formData?.d_zip}
													/>
												</div>
												<input
													type="text2"
													name="d_address"
													required={formData?.d_invoice === "2" ? true : false}
                                                    defaultValue={apiData?.Mdata?.d_address ? apiData?.Mdata?.d_address : ""}
													value={formData?.d_address}
													onChange={handleInput}
                                                    //value={formData.d_address}
												/>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="col-lg-">
							<section className={styles.content_box}>
								<div className={styles.cart_box02}>
									<div className={styles.title03}>發票資訊</div>
									<div className={styles.join_line}></div>
									<div id="Invoice_fancybox" className="add_box" style={{ width: "200px", display: "none" }}>
										<li style={{ textAlign: "center", width: "100%" }}>
											{/* <a href="#invoice_info" className="fancybox" id="GetInvoice">
												選擇/管理 統一編號
											</a> */}
										</li>
									</div>
									<div className={styles.invoice_list}>
										{apiData?.ITtypedata
											? Object.values(apiData?.ITtypedata).map((item, i) => {
													return (
														<dd key={i}>
															<input
																name="d_invoice"
																type="radio"
																value={i}
																defaultChecked={i === 0 ? true : false}
																onChange={handleInput}
															></input>
															{item}
														</dd>
													)
											  })
											: null}
									</div>
									{formData?.d_invoice === "1" ? (
										<ul className={styles.invoice_box02} style={{ display: "flex", flexWrap: "wrap" }}>
											<li>
												<h2>捐贈機關/團體*</h2>
												<select name="d_donate" id="select_invoice" className="select_point" onChange={handleInput}>
													<option value="">請選擇捐贈機關/團體</option>
													{apiData?.Idata?.map((item, i) => {
														return (
															<option value={item.d_id} key={i}>
																{item.d_title}
															</option>
														)
													})}
													<option value="Other">其他捐贈</option>
												</select>
											</li>
											{formData?.d_donate === "Other" ? (
												<li className={styles.other}>
													請輸入捐贈碼或受捐贈機關/團體名：
													<input
														type="text3"
														className="text2"
														id="invoice_other"
														name="d_othername"
														value={formData?.d_othername}
														style={{ display: "list-item" }}
														onChange={handleInput}
													/>
													<a href="images/demo/invoice.pdf">
														<span>
															(捐贈清冊下載<i className="fas fa-download"></i>)
														</span>
													</a>
												</li>
											) : null}
											<div className={styles.cart_line}></div>
										</ul>
									) : null}
									{formData?.d_invoice === "2" ? (
										<ul className={styles.styled_input} style={{ display: "flex", flexWrap: "wrap" }}>
											<li className={styles.half}>
												<h2>公司大名</h2>
												<input
													type="text"
													name="d_icname"
													required={formData?.d_invoice === "2" ? true : false}
													defaultValue={apiData?.Mdata?.d_company_title ? apiData?.Mdata?.d_company_title : ""}
                                                    value={formData?.d_icname}
													onChange={handleInput}
												/>
											</li>
											<li className={styles.half}>
												<h2>統一編號*</h2>
												<input
													type="text"
													name="d_ium"
													required={formData?.d_invoice === "2" ? true : false}
													defaultValue={apiData?.Mdata?.d_company_number ? apiData?.Mdata?.d_company_number : ""}
													value={formData?.d_ium}
                                                    onChange={handleInput}
												/>
											</li>
											<li>
												<h2>中獎寄送地址*</h2>
												<div className={styles.mem_add}>
													<TWzipcode
														css={["mem_add_inpt county-sel", "mem_add_inpt district-sel", "mem_add_inpt zipcode"]}
														handleChangeCounty={handleComChange}
														handleChangeDistrict={handleComChange}
														handleChangeZipcode={handleComChange}
														zipcodePlaceholder={"郵遞區號"}
														countyValue={apiData?.Mdata?.d_county}
														districtValue={apiData?.Mdata?.d_district}
														zipcodeValue={apiData?.Mdata?.d_zipcode}
													/>
												</div>
												<input
													type="text2"
													className="text2"
													required={formData?.d_invoice === "2" ? true : false}
													name="d_iaddress"
													defaultValue={apiData?.Mdata?.d_address}
                                                    value={formData?.d_iaddress}
													onChange={handleInput}
												/>
											</li>
											<div className={styles.cart_line}></div>
										</ul>
									) : null}
									<div className={styles.cart_line}></div>
									<div className={styles.invoice_list02}>
										<input type="checkbox" required name="d_backagree" value="Y" onChange={handleInput} />
										我同意辦理退貨時，由台灣美麗平台股份有限公司代為處理電子發票及銷貨退回折讓單以加速退款作業。
									</div>
								</div>
								<br />
								{false ? (
									<div className={styles.cart_box02}>
										<div className="title03">管理者操作區</div>
										<div className="join_line"></div>
										<ul className="styled-input">
											<li>
												<h2>部門*</h2>
												<select name="d_department" className="select_point">
													<option value="">請選擇</option>
													{apiData?.Department?.map((item, i) => {
														return <option value={item.d_id}>{item.d_code + "-" + item.d_title}</option>
													})}
												</select>
											</li>
										</ul>
									</div>
								) : null}
								<div className={styles.text_right} style={{ marginTop: "30px" }}>
									<input type="button" className={styles.btn_style07} value="返回購物車" onClick={(e)=>{e.preventDefault;router.back()}} />
									<input type="submit" className={styles.btn_style07} value="結帳" />
								</div>
							</section>
						</div>
					</div>
				</form>
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
