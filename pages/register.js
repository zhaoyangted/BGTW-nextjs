import Link from "next/link"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout/Layout"
import styles from "../components/account.module.css"
import TWzipcode from "react-twzipcode"
import axios from "axios"
import useSWR from "swr"
import DatePicker, { registerLocale } from "react-datepicker"
import tw from "date-fns/locale/zh-TW" // the locale you want
import "react-datepicker/dist/react-datepicker.css"
import { Modal } from "react-responsive-modal"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
//import moment from 'moment-timezone';
registerLocale("tw", tw)
function Register() {
	const fetcher = (url) =>
		fetch(url, { credentials: "include" })
			.then((r) => r.json())
			.catch((error) => error.json)
	const [modal, setModal] = useState(false)
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/auth/join", fetcher)
	const router = useRouter()
	const [odate, setOdate] = useState(new Date())
	const [bdate, setBdate] = useState(new Date())
	const [formData, setFormData] = useState({
		"d_operate_service[]": [],
		"TID1[]": [],
		TID: "",
		d_user_type: "2",
		d_account: "",
		d_password: "",
		d_repassword: "",
		d_company_address: "",
		d_company_name: "",
		d_company_number: "",
		d_company_title: "",
		d_company_tel_area: "00",
		d_company_tel: "",
		d_company_fax_area: "00",
		d_company_fax: "",
		d_company_website: "",
		d_operate_address: "",
		d_operate_date: "",
		d_operate_type: "",
		d_operate_people: "",
		d_pname: "",
		d_birthday: "",
		d_job: "",
		d_county: "",
		d_address: "",
		d_zipcode: "",
		d_district: "",
		SID: "10",
		d_phone: "",
		/* 'd_operate_date':new Date(),*/
		d_birthday: "",
		d_company_county: "",
		d_company_district: "",
		d_company_zipcode: "",
		d_captcha: "",
		//d_chkok: "",
		d_operate_type: "1",
		d_company_type: "1",
		d_company_address: "",
	})
	const ser = [
		"剪髮",
		"洗髮",
		"染髮",
		"燙髮",
		"接髮",
		"刮鬍",
		"頭部按摩",
		"臉部保養",
		"身體(瘦身/含放鬆)",
		"除毛",
		"足部按摩",
		"整體按摩",
		"美睫",
		"美甲/足部美甲",
		"行動美容",
		"針灸美容",
		"接骨・整骨",
	]
	const handleImgClick = (e) => {
		e.preventDefault() //console.log(e.target)
		e.target.src = process.env.apiServer + "/login/make_vcode_img" + "?" + Math.random()
	}
	const handleBdate = (date) => {
		setBdate(date)
		let date1 = new Date(date).toISOString().split("T")[0]
		//let dateYMD = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
		setFormData({ ...formData, d_birthday: date1 })
	}
	const handleOdate = (date) => {
		setOdate(date)
		let date1 = new Date(date).toISOString().split("T")[0]
		//let dateYMD = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
		setFormData({ ...formData, d_operate_date: date1 })
	}
	const handleComChange = ({ county, district, zipcode }) => {
		//console.log(data)
		setFormData((prevState) => ({
			...prevState,
			d_company_county: county,
			d_company_district: district,
			d_company_zipcode: zipcode,
		}))
	}
	const handlePesChange = ({ county, district, zipcode }) => {
		//console.log(data)
		setFormData((prevState) => ({
			...prevState,
			d_county: county,
			d_district: district,
			d_zipcode: zipcode,
		}))
	}
	const handleInput = (e) => {
		//console.log(e.targe?.name)
		e.preventDefault
		const fieldName = e.target?.name
		let fieldValue = e.target?.value
		if (fieldName === "TID1") {
			let str = ""
			str = formData[fieldName]
			//console.log(fieldValue,str.length)
			//let i = str.indexOf(fieldValue)
			//console.log(i)
			/* i >= 0 ? str.splice(i, 1) : */
			str = str.length !== 0 ? str + "@#" + fieldValue : fieldValue + ""
			//console.log(str)
			fieldValue = str
		}
		if (fieldName === "d_operate_service[]" || fieldName === "TID1[]") {
			let arr = []
			arr = formData[fieldName]
			//console.log(arr)
			let i = arr.indexOf(fieldValue)
			//console.log(i)
			i >= 0 ? arr.splice(i, 1) : arr.push(fieldValue)
			//console.log(arr)
			fieldValue = arr
		}
		setFormData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue,
		}))
	}
	const submitForm = async (e) => {
		// We don't want the page to refresh
		//console.log(formData)
		e.preventDefault
		if (formData.d_birthday === "") {
			toast("請輸入會員生日！")
			return
		}
		if (formData.chkok !== "1") {
			toast("請勾選會員條款")
			return
		}
		if (formData.d_password !== formData.d_repassword) {
			toast("密碼輸入不一致，請重新輸入！")
			return
		}
		if (formData.d_user_type === "") {
			toast("請選擇用戶類型")
			return
		}
		if (formData.captcha === "") {
			toast("請填寫驗證碼")
		}
		if (formData.SID === "10") {
			toast("請填寫業務員訊息")
			return
		}
		//console.log(e.target.action)
		const formURL = process.env.apiServer + "/api/auth/registration/"
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(formData).forEach(([key, value]) => {
			data.append(key, value)
		})
		//console.log(data)
		// POST the data to the URL of the form
		await axios
			.post(formURL, data, { credentials: "include" })
			.then((response) => {
				if (response.status === 200) {
					toast("會員加入成功，請耐心等待管理人員批覆，查證郵箱。" + response)
					router.push("/login")
				}
			})
			.catch((response) => {
				response.status === 404 ? toast.error("會員申請失敗，請聯繫管理員。" + response) : console.log(response)
			})
	}
	//{!loading &&
	//console.log(formData)
	//console.log(data, error)
	return (
		<>
			<Layout parent="首頁" /* sub="Pages" */ sub=" 加入會員">
				<div className="container">
					<div className="col-lg-">
						<section className={styles.content_box}>
							<div className={styles.title01}>加入會員</div>
							<p className="title01-ps">
								‧為保護沙龍店家權益，加入會員時請選擇企業用戶，資格審核通過後，將取得沙龍價資格。
								<br />
								<br />
								‧台灣美麗平台採用人工審核會員資格，工作時間約1-3工作天。加入官方line帳號：@hzb4006k，提供店家資料可加快審核。
								<br />
								<br />
								‧會員加入教學請參考：
								<a href="https://bit.ly/3yPxJkb" target="_blank" rel="noopener">
									https://bit.ly/3yPxJkb
								</a>
								<br />
								<br />
								如造成不便敬請見諒。
								<br />
								<br />
							</p>
							{!data?.msg ? (
								<form /* action={}  method="post"*/ onSubmit={submitForm}>
									<div className={styles.mbox02}>
										<dd className={styles.sell02} style={{ marginTop: "-20px" }}>
											{data
												? Object.values(data?.Member_user_types).map((t, i) => {
														return (
															<li key={i}>
																<label
																	className={
																		formData?.d_user_type === i + 1 + "" ? "method_label checked" : "method_label"
																	}
																	htmlFor={"deliver" + i}
																>
																	<input
																		type="radio"
																		className={styles.account}
																		id={"deliver" + i}
																		name="d_user_type"
																		checked={formData?.d_user_type === i + 1 + ""}
																		onChange={handleInput}
																		value={i + 1}
																		//check={formData.d_user_type===i+1}
																	/>
																	{t}
																</label>
															</li>
														)
												  })
												: null}
										</dd>
									</div>
									<ul className={styles.styled_input}>
										{/* <article className="company" id="company"> */}
										<div className={styles.title03} style={{ marginTop: "30px" }}>
											建立帳戶
										</div>
										<div className={styles.join_line}></div>
										<div className="join_line"></div>
										<li>
											<h2>E-mail*</h2>
											<input type="text" name="d_account" onChange={handleInput} value={formData.d_account} required />
										</li>
										<li className={styles.ps}>E-mail為您的登入帳號，務必填寫有效E-mail</li>
										<li>
											<h2>密碼*</h2>
											<input
												type="password"
												name="d_password"
												required
												onChange={handleInput}
												value={formData.d_password}
											/>
										</li>
										<li className={styles.ps}>請輸入6位數以上英數混合字元，密碼大小寫有差別</li>
										<li>
											<h2>確認密碼*</h2>
											<input
												type="password"
												name="d_repassword"
												required
												onChange={handleInput}
												value={formData.d_repassword}
											/>
										</li>
										{
											<article id="company">
												<div className={styles.title03} style={{ marginTop: "30px" }}>
													公司資訊
												</div>
												<div className="join_line"></div>
												<div className={styles.mbox02}>
													<div className={styles.sell02}>
														{data
															? Object.values(data?.Member_company_types).map((c, i) => {
																	return (
																		<div className={styles.sell_list} key={i}>
																			<label
																				className={
																					formData?.d_company_type === i + 1 + ""
																						? "method_label checked"
																						: "method_label"
																				}
																				forhtml={"company" + i}
																			>
																				<input
																					type="radio"
																					className={styles.account}
																					name="d_company_type"
																					id={"company" + c}
																					value={i + 1}
																					checked={formData.d_company_type === i + 1 + ""}
																					onChange={handleInput}
																					//required={formData.d_user_type === "2" ? true : false}
																				/>
																				{c}
																			</label>
																		</div>
																	)
															  })
															: null}
													</div>
												</div>
												<div className="company_box">
													<li>
														<h2>名稱*</h2>
														<input
															type="text"
															name="d_company_name"
															value={formData.d_company_name}
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
													</li>
													<li>
														<h2>主要營業類別*</h2>
														<div className={styles.company_list}>
															{data?.Member_types.map((t, i) => {
																return (
																	<dd key={i}>
																		<label forhtml={"TID_" + t.d_id}>
																			<input
																				type="radio"
																				className={styles.account}
																				name="TID"
																				value={t.d_id}
																				id={"TID_" + t.d_id}
																				onChange={handleInput}
																				required={formData.d_user_type === "2" ? true : false}
																			/>
																			{t.d_title}
																		</label>
																	</dd>
																)
															})}
														</div>
													</li>
													<li>
														<h2>次要營業類別</h2>
														<div className={styles.company_list}>
															{data?.Member_types.map((t, i) => {
																return (
																	<dd key={i}>
																		<label forhtml={"TID1_" + t.d_id}>
																			<input
																				type="checkbox"
																				className={styles.account}
																				name="TID1[]"
																				value={t.d_id}
																				id={"TID1_" + t.d_id}
																				onChange={handleInput}
																			/>
																			{t.d_title}
																		</label>
																	</dd>
																)
															})}
														</div>
													</li>
													<li>
														<h2 id="d_company_title">公司抬頭*</h2>
														<input
															type="text"
															name="d_company_title"
															value={formData.d_company_title}
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
													</li>
													<li>
														<h2 id="d_company_number">公司統編*</h2>
														<input
															type="text"
															name="d_company_number"
															value={formData.d_company_number}
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
													</li>
													<li className="half">
														<h2>電話*</h2>
														<input
															type="number"
															maxLength={2}
															//onKeyUp="value=value.replace(/[^\d]/g,'') "
															style={{ width: "13%", float: "inherit" }}
															name="d_company_tel_area"
															placeholder="區域碼"
															value={formData.d_company_tel_area}
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
														-
														<input
															type="number"
															maxLength={8}
															//onKeyUp="value=value.replace(/[^\d]/g,'') "
															style={{ width: "40%", float: "inherit" }}
															value={formData.d_company_tel}
															name="d_company_tel"
															placeholder="電話"
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
													</li>
													<li className="half">
														<h2>傳真</h2>
														<input
															type="text"
															//onKeyUp="value=value.replace(/[^\d]/g,'') "
															style={{ width: "13%", float: "inherit" }}
															name="d_company_fax_area"
															placeholder="區域碼"
															value={formData.d_company_fax_area}
															onChange={handleInput}
														/>
														-
														<input
															type="text"
															//onKeyUp="value=value.replace(/[^\d]/g,'') "
															style={{ width: "40%", float: "inherit" }}
															name="d_company_fax"
															value={formData.d_company_fax}
															placeholder="傳真"
															onChange={handleInput}
														/>
													</li>
													<li>
														<h2>公司網站</h2>
														<input
															type="text"
															name="d_company_website"
															value={formData.d_company_website}
															onChange={handleInput}
														/>
													</li>
													<li>
														<h2>公司地址*</h2>
														<div className={styles.mem_add} id="twzipcode">
															<TWzipcode
																className={styles.mem_add}
																css={["mem_add_inpt county-sel", "mem_add_inpt district-sel", "mem_add_inpt zipcode"]}
																handleChangeCounty={handleComChange}
																handleChangeDistrict={handleComChange}
																handleChangeZipcode={handleComChange}
																zipcodePlaceholder={"郵遞區號"}
																countyValue={formData?.d_company_county}
																districtValue={formData?.d_company_district}
																zipcodeValue={formData?.d_company_zipcode}
																required={formData.d_user_type === "2"}
															/>
															{/* <div data-role="county" data-style="mem_add_inpt" className="mem_inpt"></div>
														<div data-role="district" data-style="mem_add_inpt" className="mem_inpt"></div>
														<div data-role="zipcode" data-style="mem_add_inpt" className="mem_inpt"></div>
													 */}
														</div>
														<input
															type="text2"
															name="d_company_address"
															value={formData.d_company_address}
															onChange={handleInput}
															required={formData.d_user_type === "2" ? true : false}
														/>
													</li>
												</div>
												<div className={styles.title03} style={{ marginTop: "30px" }}>
													營業狀況
												</div>
												<div className={styles.join_line}></div>
												<div className={styles.mbox02}>
													<div className={styles.sell02}>
														{data
															? Object.values(data?.Member_operate_types).map((k, i) => {
																	return (
																		<div className={styles.sell_list} key={i}>
																			<label
																				className={
																					formData?.d_operate_type === i + 1 + ""
																						? "method_label checked"
																						: "method_label"
																				}
																				forhtml={"operate" + i}
																			>
																				<input
																					type="radio"
																					className={styles.account}
																					name="d_operate_type"
																					id={"operate" + i}
																					value={i + 1}
																					checked={formData?.d_operate_type === i + 1 + ""}
																					onChange={handleInput}
																				/>
																				{k}
																			</label>
																		</div>
																	)
															  })
															: null}
													</div>
												</div>
												{formData.d_operate_type === "2" && (
													<span id="Open">
														<div className="company_box">
															<li>
																<h2>開業日期*</h2>
																<DatePicker
																	name="d_operate_date"
																	locale={tw}
																	selected={odate}
																	onChange={(date) => {
																		handleOdate(date)
																	}}
																	showMonthDropdown
																	//showYearDropdown
																	dateFormat="yyyy-MM-dd"
																	required={formData.d_operate_type === "2"}
																/>
															</li>
															<li>
																<h2>預定地址*</h2>
																<input
																	type="text"
																	name="d_operate_address"
																	value={formData.d_operate_address}
																	onChange={handleInput}
																	required={formData.d_operate_type === "2"}
																/>
															</li>
														</div>
														<div className="company_box">
															<li>
																<h2>員工人數*</h2>
																<input
																	type="text"
																	name="d_operate_people"
																	value={formData.d_operate_people}
																	onChange={handleInput}
																	required={formData.d_operate_type === "2"}
																/>
															</li>
															<li>
																<h2>服務項目*</h2>
																<div className={styles.company_list}>
																	{ser.map((s, i) => {
																		return (
																			<dd key={i}>
																				<label className="method_label03" forhtml={"service" + s}>
																					<input
																						type="checkbox"
																						className={styles.account}
																						name="d_operate_service[]"
																						value={s}
																						id={"service" + s}
																						onChange={handleInput}
																						required={formData.d_operate_type === "2"}
																					/>
																					{s}
																				</label>
																			</dd>
																		)
																	})}
																	<dt>
																		<input
																			type="checkbox"
																			className={styles.account}
																			name="d_operate_service[]"
																			//onClick="service_Other()"
																			id="service_other"
																			value="其他"
																			onChange={handleInput}
																		/>
																		其他：
																	</dt>
																	{formData["d_operate_service[]"].includes("其他") ? (
																		<input
																			type="text"
																			className="other"
																			name="service_other"
																			id="service_other_value"
																			onChange={handleInput}
																			value={formData.service_other}
																			required={formData["d_operate_service[]"].includes("其他") ? true : false}
																		/>
																	) : null}
																</div>
															</li>
														</div>
													</span>
												)}
											</article>
										}
										{/* </article> */}

										<div className={styles.title03} style={{ marginTop: "30px" }}>
											會員資料
										</div>
										<div className={styles.join_line}></div>
										<li className={styles.half}>
											<h2>姓名*</h2>
											<input type="text" name="d_pname" onChange={handleInput} value={formData.d_pname} required />
										</li>
										<li className={styles.half}>
											<h2>職稱*</h2>
											<input type="text" name="d_job" onChange={handleInput} value={formData.d_job} required />
										</li>
										<li className={styles.half}>
											<h2>生日*</h2>
											<DatePicker
												name="d_birthday"
												locale={tw}
												selected={bdate}
												showMonthDropdown
												showYearDropdown
												scrollableYearDropdown
												onChange={(date) => {
													handleBdate(date)
												}}
												dateFormat="yyyy-MM-dd"
												required
											/>
										</li>
										<li className={styles.half}>
											<h2>手機號碼*</h2>
											<input
												type="number"
												maxLength={10}
												name="d_phone"
												onChange={handleInput}
												value={formData.d_phone}
												required
											/>
										</li>

										{formData?.d_user_type === "1" ? (
											<li>
												<h2>地址*</h2>
												<div className={styles.mem_add}>
													<TWzipcode
														css={["mem_add_inpt county-sel", "mem_add_inpt district-sel", "mem_add_inpt zipcode"]}
														handleChangeCounty={handlePesChange}
														handleChangeDistrict={handlePesChange}
														handleChangeZipcode={handlePesChange}
														zipcodePlaceholder={"郵遞區號"}
														countyValue={formData.d_county}
														districtValue={formData.d_district}
														zipcodeValue={formData.d_zipcode}
														required={formData.d_user_type === "1"}
													/>
												</div>
												<input
													type="text2"
													name="d_address"
													onChange={handleInput}
													value={formData.d_address}
													required={formData.d_user_type === "1"}
												/>
											</li>
										) : null}

										{/* <div className={styles.check_listbox}>
										<div className={styles.check_list}>
											<input
												type="checkbox"
												className={styles.account}
												id="c2"
												name="d_newsletter"
												//value="Y"
												checked={formData?.d_newsletter === "Y"}
												onChange={(e) => {
													e.preventDefault()
													formData?.d_newsletter === "Y"
														? setFormData((prevState) => ({
																...prevState,
																["d_newsletter"]: "",
														  }))
														: setFormData((prevState) => ({
																...prevState,
																["d_newsletter"]: "Y",
														  }))
												}}
												value={formData?.d_newsletter === "Y" ? "Y" : ""}
												//defaultChecked={formData?.d_newsletter === "Y"}
											/>
											
										</div>
									</div> */}
										<li className={styles.half}>
											<h2>業務員*</h2>
											<select
												className="mem_add_inpt"
												name="SID"
												/* defaultValue={"10"} */ required
												onChange={handleInput}
												value={formData.SID}
											>
												{data?.Member_Sales.map((s, i) => {
													return (
														<option
															value={s.d_id}
															//defaultValue={"10"}
															//selected={formData.SID===s.d_id}
															//defaultValue={s.d_id === "1" ? true : false}
															key={i}
														>
															{s.d_title}
														</option>
													)
												})}
											</select>
										</li>
										<div className={styles.check_list_box}>
											<div className={styles.check_list}>
												<input
													type="checkbox"
													className={styles.account}
													id="c2"
													name="d_newsletter"
													checked={formData.d_newsletter === "1"}
													value={formData.d_newsletter === "1" ? "0" : "1"}
													onChange={handleInput}
												/>
												<label forhtml="c2">
													<span></span>
													<h5>訂閱電子報</h5>
												</label>
											</div>
											<div className={styles.check_list}>
												<input
													type="checkbox"
													className={styles.account}
													id="c3"
													name="chkok"
													checked={formData.chkok === "1"}
													value={formData.chkok === "1" ? "0" : "1"}
													onChange={handleInput}
													required
												/>
												<label forhtml="c3">
													<span></span>
													<h5>
														我已詳細閱讀
														<a
															/* href="#member_terms" */ onClick={(e) => {
																e.preventDefault
																setModal(true)
															}}
															className="fancybox"
														>
															會員條款
														</a>
													</h5>
												</label>
											</div>
										</div>
										<li>
											<h2>驗証碼*</h2>
											<input type="text" name="d_captcha" onChange={handleInput} required value={formData.d_captcha} />
										</li>
										<li className={styles.contact_captcha}>
											<img
												width="10%"
												id="captcha"
												src={process.env.apiServer + "/login/make_vcode_img"}
												onClick={handleImgClick}
											/>
										</li>
										<li /* style="text-align:center;" */>
											<input type="submit" className={styles.btn_style02} value="確認送出" />
											<input type="reset" className={styles.btn_style02} value="重新填寫" />
										</li>
									</ul>
								</form>
							) : (
								<div>
									<p className="title01-ps">{data?.msg}</p>
								</div>
							)}
						</section>
					</div>
					<Modal
						open={modal}
						onClose={(e) => {
							e.preventDefault
							setModal(false)
						}}
						center={true}
						classNames={{ modal: "full-modal" }}
					>
						{modal ? (
							<section className={styles.member_terms}>
								<div className={styles.user_editor}>
									{data?.Member_rules ? <div dangerouslySetInnerHTML={{ __html: data.Member_rules }} /> : null}
								</div>
							</section>
						) : null}
					</Modal>
				</div>
			</Layout>
		</>
	)
	//}
}

export default Register
