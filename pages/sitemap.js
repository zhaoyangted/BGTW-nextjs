import React, { useEffect, useState, useCallback, useRef } from "react"
import Layout from "../components/layout/Layout"
import styles from "../components/about.module.css"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import Qainfo from '../components/qa/Qainfo'
function SiteMap() {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/homepage/sitemap", fetcher)
	const { status, data: session } = useSession()
	const [isActive, setIsActive] = useState({
		status: true,
		key: "",
	})
    const [modal,setModal] = useState(false)
    const [id,setId] = useState(0)
    const handleToggle = (key) => {
		if (isActive.key === key) {
			setIsActive({
				status: false,
			})
		} else {
			setIsActive({
				status: true,
				key,
			})
		}
	}
    const handleModalClose =() =>{
        setModal(false)
    }
    const handleModalOpen = (id) => {
        setModal(true)
        setId(id)
    }
	return (
		<>
			<Layout parent="首頁" sub=" > 網站導覽" /* subChild="Contact" */>
				<div className="page-content pt-50">
					<div className="container">
						<div className="row">
							<div className="col-xl-10 col-lg-12 m-auto">
								<section class={styles.content_box}>
									<div class={styles.title01}>網站導覽</div>
									<div class={styles.site_box}>
										<div class={styles.title02}>關於美麗平台</div>
										<ul>
											<li>
												<a href={"/about"}>公司簡介</a>
											</li>
											<li>
												<a href={"/clause"}>隱私權條款</a>
											</li>
											<li>
												<a href={"/contact"}>聯絡我們</a>
											</li>
										</ul>
									</div>
									<div class={styles.site_box}>
										<div class={styles.title02}>常見問題 Q&A</div>
										<ul>
											{data?.qa.map((q, i) => {
												return (
													<li key={i}>
														<a href="#" onClick={(e)=>{e.preventDefault;handleModalOpen(q.d_id)}}>{q.d_title}</a>
													</li>
												)
											})}
										</ul>
									</div>
									<div class={styles.site_box}>
										<div class={styles.title02}>產品分類</div>
										<ul>
											{data?.products_type.map((t, i) => {
												return (
													<li key={i}>
														<a href={"/products/index/" + t.d_id}>{t.d_title}</a>
													</li>
												)
											})}
										</ul>
									</div>
									{status === "authenticated" ? (
										<div class={styles.site_box}>
											<div class={styles.title02}>會員服務</div>
											<ul>
												<li>
													<a href={"/member"}>會員中心</a>
												</li>
												<li>
													<a href={"/member/orders"}>購物紀錄與訂單查詢</a>
												</li>
												<li>
													<a href={"/member/favorite"}>我的收藏</a>
												</li>
												<li>
													<a href={"/member/friend"}>邀請好友加入會員</a>
												</li>
												<li>
													<a href={"/member/accoun"}>會員資料修改</a>
												</li>
												<li>
													<a href={"/member/point'"}>會員點數查詢</a>
												</li>
												<li>
													<a href={"/member/accoun"}>訂閱/取消 電子報</a>
												</li>
											</ul>
										</div>
									) : null}
								</section>
							</div>
						</div>
					</div>
				</div>
			</Layout>
			{id!==0&&<Qainfo modal={modal} id={id} closeQainfolistModal={handleModalClose}/>}
		</>
	)
}

export default SiteMap
