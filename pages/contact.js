import React, { useState, useContext } from "react"
import Layout from "../components/layout/Layout"
import TWzipcode from "react-twzipcode"
import axios from "axios"
import styles from "../components/about.module.css"
import useSWR from "swr"
import Link from "next/link"
import { useRouter } from "next/router"
import { AuthContext } from "../util/useAuthContext"
import {toast} from 'react-toastify'
function Contact() {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/homepage/contact", fetcher)
    const { data:homeData, loading:homeLoading, error:homeError } = useSWR(process.env.apiServer + "/api/menus/config", fetcher)
	const router=useRouter()
	const {id,string} = router.query
	const {user} = useContext(AuthContext)
	const handleImgClick =(e) =>{
		
		e.preventDefault();//console.log(e.target)
		e.target.src=process.env.apiServer+'/login/make_vcode_img'+'?'+Math.random()
	}
	const handlePesChange = ({ county, district, zipcode }) => {
		//console.log(data)
		setFormData((prevState) => ({
			...prevState,
			d_county: county || "",
			d_district: district || "",
			d_zipcode: zipcode || "",
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
	}
	const submitForm = async (e) => {
		// We don't want the page to refresh
		e.preventDefault()
		console.log(formData)
		//console.log(e.target.action)
		const formURL = e.target.action
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(formData).forEach(([key, value]) => {
			data.append(key, value)
		})

		// POST the data to the URL of the form
		await axios
			.post(formURL, data, { credentials: "include" })
			.then((response) => {if(response.status===200){toast(response.msg);router.back()}})
			.catch((response) => {response.status===404?toast(response.msg):console.log(response.msg)})
	}
	const [formData, setFormData] = useState({
		d_name:user?.d_pname,
		d_mobile:user?.d_phone,
		d_mail:user?.d_account,
		d_county:user?.d_county,
		d_district:user?.d_district,
		d_zipcode:user?.d_zipcode,
		d_address:user?.d_address,
		d_cname:'',
		d_type_Hide:'',
		d_content:string?id+":"+string:'',
		d_type:id?"1":"0"
	})
	//console.log(id,string)
	//console.log(user)
	return (
		<>
			<Layout parent="首頁" sub=" 聯繫我們" /* subChild="Contact" */>
				<div className="page-content pt-50">
					<div className="container">
						<div className="row">
							<div className="col-xl-10 col-lg-12 m-auto">
								<section className={styles.content_box}>
									<div className={styles.title01}>聯絡我們</div>
									<div className={styles.w16}>
										如果您有任何問題或疑慮，請隨時通過下面的表單與我們聯繫，我們會儘快與您連絡，
										<br />
										如果您急於更改訂單，請通過電話與我們聯繫。
									</div>

									<div className={styles.contact_box}>
										<div className={styles.box_contact_us}>
											<p>
												{" "}
												<b>
													客服專線：
													{homeData?Object.values(homeData)[10]:null}
												</b>
											</p>
											<p>
												{" "}
												（服務時間：
												{homeData?Object.values(homeData)[9]:null}
												）
											</p>
										</div>
										<div className={styles.box_contact_us}>
											<p>
												{" "}
												<b>
													<Link href={"/qa"}>更多常見問題</Link>
												</b>
											</p>
											<p> （您可在常見問題來解決您的問題！）</p>
										</div>
									</div>
									<form id="form" action={process.env.apiServer+"/api/contact/addcontact"} method="post" onSubmit={submitForm}>
										<ul className={styles.styled_input}>
											<div className={styles.join_line}></div>
											<li>
												<h2>詢問類型*</h2>
												<select name="d_type" className={styles.d_type} value={formData.d_type}/* defaultValue={id?"1":"0"} */required onChange={handleInput}>
													<option value="0">---請選擇---</option>
													{data?.Contact_type.map((t, i) => {
														return (
															<option key={i} value={t.d_id} >
																{t.d_title}
															</option>
														)
													})}
												</select>
											</li>
											<li>
												<h2>內容*</h2>
												<textarea rows="5" name="d_content" /* defaultValue={string?id+":"+string:''} */ onChange={handleInput}required>
													{/* id ? string :  */formData.d_content}
												</textarea>
											</li>
											<div className={styles.title03} style={{ marginTop: "30px" }}>
												個人資訊
											</div>
											<div className={styles.join_line}></div>
											<li className={styles.half}>
												<h2>姓名*</h2>
												<input type="text" name="d_name" value={formData.d_name} onChange={handleInput} required/>
											</li>
											<li className={styles.half}>
												<h2>公司名稱</h2>
												<input type="text" name="d_cname" value={formData.d_cname} onChange={handleInput} />
											</li>
											<li className={styles.half}>
												<h2>聯絡電話*</h2>
												<input type="text" name="d_mobile" value={formData.d_mobile} onChange={handleInput} required/>
											</li>
											<li className={styles.half}>
												<h2>E-mail*</h2>
												<input type="text" name="d_mail" value={formData.d_mail} onChange={handleInput} required/>
											</li>
											<li>
												<h2>地址*</h2>
												<div className={styles.mem_add} id="twzipcode">
													<TWzipcode
														css={["mem_add_inpt county-sel", "mem_add_inpt district-sel", "mem_add_inpt zipcode"]}
														handleChangeCounty={handlePesChange}
														handleChangeDistrict={handlePesChange}
														handleChangeZipcode={handlePesChange}
														zipcodePlaceholder={"郵遞區號"}
														countyValue={formData?.d_county}
														districtValue={formData?.d_district}
														zipcodeValue={formData?.d_zipcode}
													/>
												</div>
												<input type="text2" name="d_address" onChange={handleInput} value={formData.d_address} required/>
											</li>
											<li>
												<h2>驗証碼*</h2>
												<input type="text" name="d_captcha" onChange={handleInput} value={formData?.d_captcha} required/>
											</li>
											<li className={styles.contact_captcha}>
												<img width="10%" id="captcha" src={process.env.apiServer+"/login/make_vcode_img"}onClick={handleImgClick} />
											</li>
											<div className={styles.join_line}></div>
											<li style={{textAlign:"center"}}>
												<input id="send" type="submit" className={styles.btn_style02} value="確認送出" />
												<input type="reset" className={styles.btn_style02} value="重新填寫" />
												<input type="hidden" name="d_type_Hide" />
											</li>
										</ul>
									</form>
								</section>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Contact
