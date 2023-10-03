import React, { useEffect, useState, useCallback, useRef, useContext } from "react"
import Layout from "../components/layout/Layout"
import styles from "../components/about.module.css"
import useSWR from "swr"
//import { useSession } from "next-auth/react"
import { AuthContext, useAuthContext } from "../util/useAuthContext"
import { useAuth } from "../util/useAuth"
import Qainfo from '../components/qa/Qainfo'
import Link from "next/link"
function SiteMap() {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/homepage/sitemap", fetcher)
	//const { status, data: session } = useSession()
	const {user,setUser,signOut}=useContext(AuthContext)
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
			<Layout parent="首頁" sub=" 網站導覽" /* subChild="Contact" */>
				<div className="page-content pt-50">
					<div className="container">
						<div className="row">
							<div className="col-xl-10 col-lg-12 m-auto">
								<section className={styles.content_box}>
									<div className={styles.title01}>網站導覽</div>
									<div className={styles.site_box}>
										<div className={styles.title02}>關於美麗平台</div>
										<ul>
											<li>
												<Link href={"/about"}>公司簡介</Link>
											</li>
											<li>
												<Link href={"/clause"}>隱私權條款</Link>
											</li>
											<li>
												<Link href={"/contact"}>聯絡我們</Link>
											</li>
										</ul>
									</div>
									<div className={styles.site_box}>
										<div className={styles.title02}>常見問題 Q&A</div>
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
									<div className={styles.site_box}>
										<div className={styles.title02}>產品分類</div>
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
									{user?.isLoggedIn  ? (
										<div className={styles.site_box}>
											<div className={styles.title02}>會員服務</div>
											<ul>
												<li>
													<Link href={"/account"}>會員中心</Link>
												</li>
												<li>
													<Link href={"/account/?activeTab=order"}>購物紀錄與訂單查詢</Link>
												</li>
												<li>
													<Link href={"/account/?activeTab=favor"}>我的收藏</Link>
												</li>
												<li>
													<Link href={"/account/?activeTab=friend"}>邀請好友加入會員</Link>
												</li>
												<li>
													<Link href={"/account?activeTab=info"}>會員資料修改</Link>
												</li>
												<li>
													<Link href={"/account?activeTab=point"}>會員點數查詢</Link>
												</li>
												<li>
													<Link href={"/account?activeTab=info"}>訂閱/取消 電子報</Link>
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
