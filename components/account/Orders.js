import React, { useEffect, useState } from "react"
import styles from "../../components/account.module.css"
import axios from "axios"
const Orders = () => {
	//const fetcher = (url) => fetch(url, { method:"POST", credentials: "include" }).then((r) => r.json())
	//const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/orders", fetcher)
	const [info, setInfo] = useState({ pay_type: "", order_source: "" })
	const [data, setData] = useState({})

	const handlSubmit = async () => {
		//e.preventDefault()
		//console.log(e.target.value)
		const data = new FormData()
		Object.entries(info).forEach(([key, value]) => {
			data.append(key, value)
		})
		const formURL = process.env.apiServer + "/api/member/orders/"
		await axios
			.post(formURL, data, { credentials: "include" })
			.then((response) => setData(response.data))
			.catch((error) => console.log(error))
	}
	const handleChange = (e) => {
		e.preventDefault
		const fieldName = e.target?.name
		const fieldValue = e.target?.value
		setInfo((prevStat) => ({
			...prevStat,
			[fieldName]: fieldValue,
		}))
	}
	useEffect(() => {
		handlSubmit()
	}, [info])
	function arrayColumn(array, column) {
		if (array) {
			return array.map((item) => item[column])
		}
	}
	const Pay_types = arrayColumn(data?.Pay_types, "d_title", "d_id")
	return (
		<>
			{data && (
				<section className={styles.content_box}>
					<div className="center">
						<form id="form" className={styles.filter} action="/member/orders" method="post">
							<select name="pay_type" onChange={(e) => handleChange(e)} className={styles.select_sort}>
								<option value="">---付款方式---</option>
								{data?.Pay_types?.map((t, i) => {
									return (
										<option
											value={t.d_id}
											//name='pay_type'
											key={i}
											//onChange={(e)=>handlSubmit(e)}
											/* selected */
											/* <? echo !empty($_POST['pay_type'])&&$_POST['pay_type']==$p['d_id'] ?'selected':''{t.d_title} */
										>
											{t.d_title}
										</option>
									)
								})}
							</select>
							<select name="order_source" onChange={(e) => handleChange(e)} className={styles.select_sort}>
								<option value="">---訂單來源---</option>
								<option
									value="1" //name='order_source'
									//onChange={(e)=>handlSubmit(e)}
									/* <? echo !empty($_POST['order_source'])&&$_POST['order_source']=='1' ?'selected':''; ?>
									 */
								>
									網路
								</option>
								<option
									value="2" //name='order_source'
									//onChange={(e)=>handlSubmit(e)}
									/* <? echo !empty($_POST['order_source'])&&$_POST['order_source']=='2' ?'selected':''; ?>
									 */
								>
									門市
								</option>
							</select>
						</form>
					</div>
					<div className={styles.order}>
						<h1>購物紀錄</h1>
						{data?.dbdata?.dbdata
							? /* <?php $Pay_types = array_column($Pay_types,'d_title','d_id'); ?> */
							  data?.dbdata?.dbdata.map((o, i) => {
									return (
										<ul key={i}>
											<li>
												<div className="dbox">
													<dd>訂單編號</dd>
													<em>
														<a href={"/order/" + o.d_id}>{o.OID}</a>
													</em>
												</div>
												<div className="dbox">
													<dd>訂購日期</dd>
													{o.d_create_time}
												</div>
											</li>
											<li>
												<div className="dbox">
													<dd>訂單金額</dd>
													<b>{o.d_total}</b>
												</div>
												<div className="dbox">
													<dd>付款方式</dd>
													{Pay_types[o.d_pay - 2] ? Pay_types[o.d_pay - 2] : "付款方式已不存在"}
												</div>
											</li>
											<li>
												<div className="dbox">
													<dd>訂單狀態</dd>
													{data?.Orders_status[`${o.d_orderstatus}`] +
														(o.d_shipnumber
															? `物流單號：<a href="https://www.t-cat.com.tw/inquire/trace.aspx" target="_blank">${o.d_shipnumber}</a>`
															: "")}
												</div>
												<div className="dbox">
													{o.d_pay === 1 && o.d_orderstatus < 3 ? (
														<a
															className={"bn" + o.d_paystatus === 3 ? "2" : ""}
															href={o.d_paystatus === 3 ? "javascript: void(0)" : "member/orders/pay/" + o.d_id}
														>
															{" "}
															{o.d_paystatus === 3 ? "已填寫" : "匯款回覆"}
														</a>
													) : null}
													{o.d_orderstatus === 3 ? (
														<a className="bn" href={"/member/orders/refund/" + o.d_id}>
															申請退貨
														</a>
													) : null}
													<a className={styles.bn} href={"/member/orders/ask/" + o.d_id}>
														訂單詢問
													</a>
													{o.d_orderstatus < 3 || o.d_orderstatus === 10 || o.d_orderstatus === 1 ? (
														<a className="bn" href={"/member/orders/cancel/" + o.d_id}>
															取消訂單
														</a>
													) : null}
													{o.d_orderstatus === 11 ? (
														<a
															className="bn"
															href={"/member/orders/info/" + o.d_id}
															style={{ backgroundColor: "#ff3c6c", border: "1px solid #ff3c6c" }}
														>
															繼續付款
														</a>
													) : null}
												</div>
											</li>
										</ul>
									)
							  })
							: null}
					</div>
				</section>
			)}
			{data?.dbdata?.dbdata?
            <div dangerouslySetInnerHTML={{__html:data?.dbdata?.PageList}} >
            </div>
            :''}
		</>
	)
}

export default Orders
