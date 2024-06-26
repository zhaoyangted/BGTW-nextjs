import React,{useContext, useEffect} from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
//import { useAuth } from "../../util/useAuth"
//import { useRouter } from "next/router"
import Link from "next/link"
import { AuthContext } from "../../util/useAuthContext"
const Member = () => {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	//const { user, setUser, signOut } = useAuth()
	//const router = useRouter()
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/", fetcher)
	const {user,setUser} = useContext(AuthContext)
	return (
		<>
				<section className={styles.content_box}>
					<div className={styles.title01}>會員中心</div>
					<div className={styles.contact_box}>
						<div className={styles.box_contact_us}>
							<p>
								<b>{data?.dbdata.d_pname} 您好</b>
							</p>

							{data?.dbdata.d_chked === 2 ? (
								<p>
									<b>您的帳號正在審核中</b>
								</p>
							) : null}
						</div>

						<div className={styles.box_contact_us}>
							<p>
								{" "}
								<b>您的目前等級：{data?.Lvtitle}</b>
							</p>
							<p>
								{" "}
								<b>您的會員分類：{data?.Member_type[0].d_title}</b>
							</p>
						</div>
					</div>
					<div className={styles.member_info}>
						<li>
							<div className={styles.title06}>訂單狀態與管理</div>
							<div className={styles.member_info_btn}>
								<Link href={"/account/?activeTab=order"}>
									<ul>訂單查詢 ({data?.Orders_total?.total ? data?.Orders_total?.total : "0"})</ul>
								</Link>
							</div>
						</li>
						<li>
							<div className={styles.title06}>個人帳戶管理/資料維護</div>
							<div className={styles.member_info_btn}>
								<Link href="/account/?activeTab=info">
									<ul>會員資料修改</ul>
								</Link>
								<Link href="/account/?activeTab=favor">
									<ul>我的收藏清單</ul>
								</Link>
								<Link href="/account/?activeTab=point">
									<ul>會員點數查詢</ul>
								</Link>
							</div>
						</li>
						<li>
							<div className={styles.title06}>客服中心</div>
							<div className={styles.member_info_btn}>
								<Link href="">
									<ul>購物說明</ul>
								</Link>
								<Link href="/clause">
									<ul>隱私權條款</ul>
								</Link>
								<Link href="/contact">
									<ul>與我們聯繫</ul>
								</Link>
								{/* <a href="">
								<ul>型錄下載</ul>
							</a> */}
							</div>
						</li>
					</div>
				</section>
			</>
	)
}

export default Member
