import React,{useState} from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
const Friends = () => {
    const [email,setEmail]= useState({})
    const handleInput =(e)=>{
        e.preventDefault()
        const fieldName = e.target?.name
		const fieldValue = e.target?.value
        setEmail((prevState) => ({
			...prevState,
			[fieldName]: fieldValue||'',
		}))
    }
    const handleSubmit = async() =>{
        e.preventDefault()
		//console.log(e.target.action)
		const formURL = e.target.action
		const data = new FormData()

		// Turn our formData state into data we can use with a form submission
		Object.entries(email).forEach(([key, value]) => {
			data.append(key, value)
		})

		// POST the data to the URL of the form
		await axios.post(formURL, data, {credentials:'include'})
		.then(
			(response)=>console.log(response))
		.catch(
			(error)=>console.log(error))
    }
	return (
		<>
			<section className={styles.content_box}>
				<div className={styles.w16}>
					推薦Beauty Garage 台灣美麗平台給朋友，朋友成功加入會員，並首次購物成功，您可獲得{" "}
					<span className={styles.r18}>
						<b>100</b>
					</span>{" "}
					紅利點數
				</div>
				<form action={process.env.apiServer + "/api/member/checkafriend/"} method="post" onSubmit={handleSubmit}>
					<ul className={styles.styled_input} style={{ marginTop: "30px" }}>
						<div className={styles.join_line}></div>
						<li>
							<h2>朋友的E-mail*</h2>
							<input type="text" name="d_Femail" value={email.d_Femail} onChange={handleInput}/>
						</li>
						<div className={styles.join_line}></div>
						<li style={{ textAlign: "center" }}>
							<input type="submit" className={styles.btn_style02} value="確認送出" />
							<input type="reset" className={styles.btn_style02} value="重新填寫" />
						</li>
					</ul>
				</form>
			</section>
		</>
	)
}
export default Friends
