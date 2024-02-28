import { useEffect, useState, useCallback, useRef, useContext } from "react"
import React from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
import TWzipcode from "react-twzipcode"
import axios from "axios"
import {toast} from 'react-toastify'
import { AuthContext } from "../../util/useAuthContext"
const AccEdit = () => {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/account", fetcher)
	const {user,setUser} = useContext(AuthContext)
	const handleImgClick =(e) =>{
		
		e.preventDefault();//console.log(e.target)
		e.target.src=process.env.apiServer+'/login/make_vcode_img'+'?'+Math.random()
	}
	const handleComChange = ({ county, district, zipcode }) => {
		//console.log(data)
		setFormData((prevState) => ({
			...prevState,
			d_company_county: county || "",
			d_company_district: district || "",
			d_company_zipcode: zipcode || "",
		}))
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
			[fieldName]: fieldValue||'',
		}))
		//console.log(formData)
	}
	const submitForm = async(e) => {
		// We don't want the page to refresh
		e.preventDefault()
		//console.log(e.target.action)
		if (formData.d_captcha==='') {
			toast("請填寫驗證碼")
			handleImgClick
			return
		}
		if (formData.d_password===null&&formData.d_repassword===null) {
			setFormData((prevState)=>({
				...prevState,
				[d_password]:'',
				[d_repassword]:'',
			}))
		} 
		if (formData.d_password!==formData.d_repassword){
			toast("密碼不一致")
			return
		}
		const formURL = process.env.apiServer+"/api/member/checkaccount/"
		const data = new FormData()
		//console.log(data)
		// Turn our formData state into data we can use with a form submission
		Object.entries(formData).forEach(([key, value]) => {
			data.append(key, value)
		})

		// POST the data to the URL of the form
		await axios.post(formURL, data, {credentials:'include'})
		.then(
			(response)=>{if(response.status===200){toast("會員資料更新成功！")}})
		.catch(
			(response)=>{response.status===404?toast(response.msg):console.log(response.msg)})
		/*fetch(formURL, {
			method: "POST",
			body: data,
			credentials: "include",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			 setFormData({
				d_company_name: res?.dbdata.d_company_name || "",
				d_company_title: res?.dbdata.d_company_title || "",
				d_company_number: res?.dbdata.d_company_number || "",
				d_company_tel_area: res?.dbdata.d_company_tel_area || "",
				d_company_tel: res?.dbdata.d_company_tel || "",
				d_company_fax_area: res?.dbdata.d_company_fax_area || "",
				d_company_fax: res?.dbdata.d_company_fax || "",
				d_company_website: res?.dbdata.d_company_website || "",
				d_company_account: res?.dbdata.d_company_account || "",
				d_pname: res?.dbdata.d_pname || "",
				d_job: res?.dbdata.d_job || "",
				d_birthday: res?.dbdata.d_birthday || "",
				d_phone: res?.dbdata.d_phone || "",
				d_newsletter: res?.dbdata.d_newsletter || "",
				county: res?.dbdata.d_company_county || "",
				district: res?.dbdata.d_company_district || "",
				zipcode: res?.dbdata.d_company_zipcode || "",
				d_company_address: res?.dbdata.d_company_address || "",
				d_county: res?.dbdata.d_county || "",
				d_district: res?.dbdata.d_district || "",
				d_zipcode: res?.dbdata.d_zipcode || "",
				d_address: res?.dbdata.d_address || "",
				d_account: res?.dbdata.d_account || "",
			}) 
		})*/
	}
	useEffect(() => {
		if (data?.dbdata.d_user_type === "2") {
			setFormData({
				d_company_name: data?.dbdata.d_company_name || "",
				d_company_title: data?.dbdata.d_company_title || "",
				d_company_number: data?.dbdata.d_company_number || "",
				d_company_tel_area: data?.dbdata.d_company_tel_area || "",
				d_company_tel: data?.dbdata.d_company_tel || "",
				d_company_fax_area: data?.dbdata.d_company_fax_area || "",
				d_company_fax: data?.dbdata.d_company_fax || "",
				d_company_website: data?.dbdata.d_company_website || "",
				d_pname: data?.dbdata.d_pname || "",
				d_job: data?.dbdata.d_job || "",
				d_birthday: data?.dbdata.d_birthday || "",
				d_phone: data?.dbdata.d_phone || "",
				d_newsletter: data?.dbdata.d_newsletter || "",
				d_county: data?.dbdata.d_county || "",
				d_district: data?.dbdata.d_district || "",
				d_zipcode: data?.dbdata.d_zipcode || "",
				d_address: data?.dbdata.d_address || "",
				d_account: data?.dbdata.d_account || "",
				d_company_county: data?.dbdata.d_company_county || "",
				d_company_district: data?.dbdata.d_company_district || "",
				d_company_zipcode: data?.dbdata.d_company_zipcode || "",
				d_company_address: data?.dbdata.d_company_address || "",
				d_password:"",
				d_repassword:"",
				d_captcha:""
			})
		} else {
			setFormData({
				d_company_name: data?.dbdata.d_company_name || "",
				d_company_title: data?.dbdata.d_company_title || "",
				d_company_number: data?.dbdata.d_company_number || "",
				d_company_tel_area: data?.dbdata.d_company_tel_area || "",
				d_company_tel: data?.dbdata.d_company_tel || "",
				d_company_fax_area: data?.dbdata.d_company_fax_area || "",
				d_company_fax: data?.dbdata.d_company_fax || "",
				d_company_website: data?.dbdata.d_company_website || "",
				//d_company_account: data?.dbdata.d_company_account || "",
				d_pname: data?.dbdata.d_pname || "",
				d_job: data?.dbdata.d_job || "",
				d_birthday: data?.dbdata.d_birthday || "",
				d_phone: data?.dbdata.d_phone || "",
				d_newsletter: data?.dbdata.d_newsletter || "",
				d_county: data?.dbdata.d_county || "",
				d_district: data?.dbdata.d_district || "",
				d_zipcode: data?.dbdata.d_zipcode || "",
				d_address: data?.dbdata.d_address || "",
				d_account: data?.dbdata.d_account || "",
				d_company_county: data?.dbdata.d_company_county || "",
				d_company_district: data?.dbdata.d_company_district || "",
				d_company_zipcode: data?.dbdata.d_company_zipcode || "",
				d_company_address: data?.dbdata.d_company_address || "",
				d_password:"",
				d_repassword:"",
				d_captcha:""
			})
		}
	}, [data])
	//console.log(formData)
	const [formData, setFormData] = useState({
		d_company_name: "",
			d_company_title: "",
			d_company_number: "",
			d_company_tel_area: "",
			d_company_tel: "",
			d_company_fax_area: "",
			d_company_fax: "",
			d_company_website: "",
			d_pname: "",
			d_job: "",
			d_birthday: "",
			d_phone: "",
			d_newsletter: "",
			d_county: "",
			d_district: "",
			d_zipcode: "",
			d_address: "",
			d_account: "",
			d_company_county: "",
			d_company_district: "",
			d_company_zipcode: "",
			d_company_address: "",
			d_county: "",
			d_district: "",
			d_zipcode: "",
			d_address: "",
			d_password:"",
			d_repassword:"",
			d_captcha:""
	
	})
	//console.log(formData)
	return (
		<>
			<section className={styles.content_box}>
				{/* <div className={styles.title01}>會員資料修改</div> */}
				<form /* action={process.env.apiServer+"/api/member/checkaccount/"} method="post" */ onSubmit={submitForm}>
					<div className={styles.mbox}>
						<dd className={styles.sell} style={{ marginTop: "-20px" }}>
							<li>
								<label className={styles.checked} htmlFor="deliver02">
									<input type="radio" id="deliver02" defaultChecked /* onChange={handleInput}  */className={styles.account}/>
									{data?.dbdata.d_title}
								</label>
							</li>
						</dd>
					</div>
					<ul className={styles.styled_input}>
						{data?.dbdata.d_user_type === "2" && (
							<article className="company" id="company">
								<div className={styles.title03} style={{ marginTop: "30px" }}>
									公司資訊
								</div>
								<div className={styles.join_line}></div>
								<div className={styles.company_box}>
									<li>
										<h2>名稱*</h2>
										<input 
										type="text" 
										name="d_company_name" 
										onChange={handleInput} 
										value={formData?.d_company_name} 
										placeholder="公司簡稱" 
										required={data?.dbdata.d_user_type === "2"?true:false}
										/>
									</li>
									<li>
										<h2 id="d_company_title">公司抬頭*</h2>
										<input
											type="text"
											name="d_company_title"
											onChange={handleInput}
											value={formData?.d_company_title}
											placeholder="公司抬頭"
											required={data?.dbdata.d_user_type === "2"?true:false}
										/>
									</li>
									<li>
										<h2 id="d_company_number">公司統編*</h2>
										<input
											type="text"
											name="d_company_number"
											onChange={handleInput}
											value={formData?.d_company_number}
											placeholder="公司統編"
											required={data?.dbdata.d_user_type === "2"?true:false}
										/>
									</li>
									<li className={styles.half}>
										<h2>電話*</h2>
										<input
											type="text"
											//onKeyUp="value=value.replace(/[^\d]/g,'')"
											style={{ width: "20%", float: "inherit" }}
											name="d_company_tel_area"
											placeholder="區域碼"
											onChange={handleInput}
											value={formData?.d_company_tel_area}
										/>
										-
										<input
											type="text"
											//onKeyUp={value.replace(/[^\d]/g,'')}
											style={{ width: "40%", float: "inherit" }}
											name="d_company_tel"
											placeholder="電話"
											onChange={handleInput}
											value={formData?.d_company_tel}
										/>
									</li>
									<li className={styles.half}>
										<h2>傳真</h2>
										<input
											type="text"
											//onKeyUp={value.replace(/[^\d]/g,'')}
											style={{ width: "20%", float: "inherit" }}
											name="d_company_fax_area"
											placeholder="區域碼"
											onChange={handleInput}
											value={formData?.d_company_fax_area}
											//value={data?.dbdata.d_company_fax_area}
										/>
										-
										<input
											type="text"
											//onKeyUp={value.replace(/[^\d]/g,'')}
											style={{ width: "40%", float: "inherit" }}
											name="d_company_fax"
											placeholder="傳真"
											onChange={handleInput}
											value={formData?.d_company_fax}
											//value={data?.dbdata.d_company_fax}
										/>
									</li>
									<li>
										<h2>公司網站</h2>
										<input
											type="text"
											name="d_company_website"
											onChange={handleInput}
											value={formData?.d_company_website}
										/>
									</li>
									<li>
										<h2>公司地址*</h2>
										<div className={styles.mem_add}>
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
											/>
										</div>
										<input
											type="text2"
											name="d_company_address"
											onChange={handleInput}
											value={formData?.d_company_address}
										/>
									</li>
								</div>
							</article>
						)}
						<div className={styles.title03} style={{ marginTop: "30px" }}>
							建立帳戶
						</div>
						<div className={styles.join_line}></div>
						<li>
							<h2>E-mail*</h2>
							<h4>{formData?.d_account}</h4>
						</li>
						<li>
							<h2>密碼*</h2>
							<input type="password" name="d_password" value={formData.d_password} onChange={handleInput}/>
						</li>
						<li>
							<h2>確認密碼*</h2>
							<input type="password" name="d_repassword" value={formData.d_repassword} onChange={handleInput}/>
						</li>
						<div className={styles.title03} style={{ marginTop: "30px" }}>
							會員資料
						</div>
						<div className={styles.join_line}></div>
						<li className={styles.half}>
							<h2>姓名*</h2>
							<h4>{formData?.d_pname}</h4>
						</li>
						<li className={styles.half}>
							<h2>職稱*</h2>
							<input type="text" name="d_job" onChange={handleInput} value={formData?.d_job} />
						</li>
						<li className={styles.half}>
							<h2>生日*</h2>
							<h4>{formData?.d_birthday}</h4>
						</li>
						<li className={styles.half}>
							<h2>手機號碼*</h2>
							<input type="text" name="d_phone" onChange={handleInput} value={formData?.d_phone} />
						</li>
						{data?.dbdata?.d_user_type === "1" && (
							<li>
								<h2>地址*</h2>
								<div className={styles.mem_add}>
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
								<input type="text2" name="d_address" onChange={handleInput} value={formData?.d_address} />
							</li>
						)}
						<div className={styles.check_list_box}>
							<div className={styles.check_list}>
								<input
									type="checkbox"
									id="c2"
									name="d_newsletter"
									className={styles.account}
									//value="Y"
									checked={formData?.d_newsletter==='Y'}
									onChange={(e) => {
										e.preventDefault()
										formData?.d_newsletter === "Y"
											? setFormData((prevState) => ({
													...prevState,
													["d_newsletter"]: '',
											  }))
											: setFormData((prevState) => ({
													...prevState,
													["d_newsletter"]: "Y",
											  }))
									}}
									value={formData?.d_newsletter==='Y'?'Y':''}
									//defaultChecked={formData?.d_newsletter === "Y"}
								/>
								<label htmlFor="c2">
									<span></span>
									<h5>訂閱電子報</h5>
								</label>
							</div>
						</div>
						<li>
							<h2>驗証碼*</h2>
							<input type="text" name="d_captcha"  onChange={handleInput}  value={formData.d_captcha} required />
						</li>
						<li className={styles.contact_captcha}>
							<img width="10%" id="captcha" src={process.env.apiServer + "/login/make_vcode_img"} onClick={handleImgClick}/>
						</li>
						<li /* style="text-align:center;" */>
							<input type="submit" className={styles.btn_style02} value="確認送出" />
							<input type="reset" className={styles.btn_style02} value="重新填寫" />
						</li>
					</ul>
				</form>
			</section>
		</>
	)
}

export default AccEdit
