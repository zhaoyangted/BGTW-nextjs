import React, { useContext } from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
import Link from "next/link"
import { AuthContext } from "../../util/useAuthContext"
const Point = () => {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/point", fetcher)
	const {user,setUser} = useContext(AuthContext)
	return (
	<>
			<section className={styles.content_box}>
				<div className={styles.title01}>會員點數</div>
				<div className={styles.point_info}>
					<ul>
						<h1>
							{data?.Mdata?.d_bonus}
							<em>點</em>
						</h1>
						<h2>目前可用紅利點數</h2>
					</ul>
					{data?.Edata ? (
						<ul>
							<h1>
								{data?.Edata?.d_total}
								<em>點</em>
							</h1>
							<h2>{data?.Edata?.Daedline}到期</h2>
						</ul>
					) : null}
					<li>
						<div className="title03">紅利點數說明</div>
						<div className="user_editor" /*  style="margin-top:-2px;" */>
							<div className="w14_2" dangerouslySetInnerHTML={{ __html: data?.Content.d_title.trim("/") }}></div>
						</div>
					</li>
				</div>
				<div className={styles.discount}>
					<h6>紅利點數記錄</h6>
					{data?.dbdata.dbdata
						? data.dbdata.dbdata.map((item, i) => {
								return (
									<ul className={item.d_enable === "N" ? current : ""} key={i}>
										<li>
											<div className="dbox">
												<dd>訂單編號</dd>
												{item.OID ? (
													<em>
														{item.d_enable !== "N"&&<Link 
														//href={item.d_enable === "N" ? "#" : `/order/` + item.orderid}
														href={{
															pathname:"/order/info",
															query:{id:item.orderid}
														}}
														>{item.OID}</Link>}
													</em>
												) : (
													"---"
												)}
											</div>
											<div className="dbox">
												<dd>說　　明</dd>
												{item.d_content}
											</div>
										</li>
										<li>
											<div className="dbox">
												<dd>發送日期</dd>
												{item.d_type === "1" ? item.d_create_date : "---"}
											</div>
											<div className="dbox">
												<dd>使用期限</dd>
												{item.d_type === "1" ? item.Daedline : "---"}
											</div>
										</li>
										<li>
											<dd>點數</dd>
											<b>{(item.d_type === "1" ? "+" : "-") + item.d_num}</b>
										</li>
									</ul>
								)
						  })
						: null}
				</div>
				{data?.dbdata?.dbdata ? <div dangerouslySetInnerHTML={{ __html: data?.dbdata.PageList }}></div> : ""}
				{/* 會員紅利--echo !empty($dbdata['dbdata'])?$dbdata['PageList']:'' */}
			</section>
		</>
	)
}

export default Point
