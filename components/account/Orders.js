import React, { useContext, useEffect, useState } from "react"
import styles from "../../components/account.module.css"
import axios from "axios"
import Pagination from "../ecommerce/Pagination"
//import { useAuth } from "../../util/useAuth"
import { useRouter } from "next/router"
import { AuthContext } from "../../util/useAuthContext"
import Link from "next/link"
const Orders = () => {
	//const fetcher = (url) => fetch(url, { method:"POST", credentials: "include" }).then((r) => r.json())
	//const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/orders", fetcher)
	const [info, setInfo] = useState({ pay_type: "", order_source: "",page:0 })
	const [data, setData] = useState({})
	const showLimit = 5,
		showPagination = 4
	let [pagination, setPagination] = useState([])
	let [limit, setLimit] = useState(showLimit)
	let [pages, setPages] = useState(Math.ceil(data?.dbdata?.PageList?.TotalRecord / limit))
	let [currentPage, setCurrentPage] = useState(1)
	let [getPaginationGroup, setGetPaginationGroup] = useState()
	const router = useRouter()
	//const { data:session } = useSession()
	const {user,setUser}=useContext(AuthContext)
	//console.log(user?.isLoggedIn)
	/* useEffect(() => {
		if (!user?.isLoggedIn) {
			router.push("/login/")
		}
	}, []) */
	useEffect(() => {
		const cratePagination = () => {
			// set pagination
			let arr = new Array(data?.dbdata?.PageList?.TotalPage /* Math.ceil(data?.dbdata?.PageList?.TotalRecord / limit) */)
				.fill()
				.map((_, idx) => idx + 1)

			setPagination(arr)
			setPages(data?.dbdata?.PageList?.TotalPage /* Math.ceil(data?.dbdata?.PageList?.TotalRecord / limit) */)
			let start = Math.floor((currentPage - 1) / showPagination) * showPagination
			let end = start + showPagination
			setGetPaginationGroup(arr.slice(start, end))
		}
		cratePagination()
	}, [data, currentPage])

	const next = () => {
		setCurrentPage((page) => page + 1)
	}

	const prev = () => {
		setCurrentPage((page) => page - 1)
	}

	const handleActive = (item) => {
		setCurrentPage(item)
		setInfo((prevStat) => ({
			...prevStat,
			['page']: item,
		}))
	}

	const selectChange = (e) => {
		setLimit(Number(e.target.value))
		setCurrentPage(1)
		setPages(Math.ceil(products?.pages.TotalRecord / Number(e.target.value)))
	}
	const handlSubmit = async () => {
		//e.preventDefault()
		//console.log(e.target.value)
		const data = new FormData()
		Object.entries(info).forEach(([key, value]) => {
			data.append(key, value)
		})
		const formURL = process.env.apiServer + `/api/member/orders/?page=${currentPage-1}`
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
	//console.log(info)
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
														<Link 
														//href={"/order/" + o.d_id}
														href={{
															pathname:"/order/info",
															query:{id:o.d_id}
														}}
														>{o.OID}</Link>
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
														<Link
															className={"bn" + o.d_paystatus === 3 ? "2" : ""}
															href={{
																pathname:"/member/orders/pay",
																query:{id: o.d_id}
															}}
															//href={o.d_paystatus === 3 ? null : "member/orders/pay/" + o.d_id}
														>
															{" "}
															{o.d_paystatus === 3 ? "已填寫" : "匯款回覆"}
														</Link>
													) : null}
													{o.d_orderstatus === 3 ? (
														<Link className="bn" 
														//href={"/member/orders/refund/" + o.d_id}
														href={{
															pathname:"/member/orders/refund",
															query:{id: o.d_id}
														}}
														>
															申請退貨
														</Link>
													) : null}
													<Link className={styles.bn} 
													//href={"/member/orders/ask/" + o.d_id}
													href={{
														pathname:"/member/orders/ask",
														query:{id: o.d_id}
													}}
													>
														訂單詢問
													</Link>
													{o.d_orderstatus < 3 || o.d_orderstatus === 10 || o.d_orderstatus === 1 ? (
														<Link className="bn" 
														//href={"/member/orders/cancel/" + o.d_id}
														href={{
															pathname:"/member/orders/cancel",
															query:{id: o.d_id}
														}}
														>
															取消訂單
														</Link>
													) : null}
													{o.d_orderstatus === 11 ? (
														<Link
															className="bn"
															href={{
																pathname:"/member/orders/info",
																query:{id: o.d_id}
															}}
															style={{ backgroundColor: "#ff3c6c", border: "1px solid #ff3c6c" }}
														>
															繼續付款
														</Link>
													) : null}
												</div>
											</li>
										</ul>
									)
							  })
							: null}
					</div>
					<div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
							<nav aria-label="Page navigation example">
								{getPaginationGroup && (
									<Pagination
										getPaginationGroup={getPaginationGroup}
										currentPage={currentPage}
										pages={pages}
										next={next}
										prev={prev}
										handleActive={handleActive}
									/>
								)}
							</nav>
					</div>
				</section>
			)}
			{/* {data?.dbdata?.dbdata ? <div dangerouslySetInnerHTML={{ __html: data?.dbdata?.PageList }}></div> : ""} */}
			{/* <Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
    				function changepage(Topage){$('#ToPage').val(Topage);
					$("#search_form").submit();
  					`,
				}}
			/> */}
		</>
	)
}

export default Orders
