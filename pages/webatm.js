import Layout from "../components/layout/Layout"
import styles from "../components/qa.module.css"
import React,{useRef,useEffect} from "react"
//import {connect} from "react-redux"
//import styles from "../components/404.module.css"
import { useRouter } from "next/router"
//import useSWR from "swr"
function Webatm() {
	/*  const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/homepage/clause", fetcher) */
    const router = useRouter();
    const {
        query:{
            account,
            total,
        }
    } =router
    const props ={
            account,
            total
    }
	return (
		<>
			<Layout parent="首頁" /*sub=" 隱私條款"  subChild="Guide" */>
				<div className="page-content">
					<div className="container">
						<div className="row" /*  ml-100 mr-100 */>
							<section className={styles.content_box}>
								{/* <div className={styles.title01}>隱私權條款</div> */}
								<div
									className="user_editor"
									//dangerouslySetInnerHTML={{__html:data?.ClauseData}}
								>
									以下是您的webATM轉帳資訊<br/>
									銀行代號：007<br/>
									銷帳編號：{props.account}<br/>
									繳款金額：{props.total}<br/>
									以下提供給您繳款方式教學<br/>
									<br/>
									臨櫃繳款：<br/>
									請攜帶本繳款單至第一銀行全省各地分行櫃檯繳款。<br/>
									<br/>
									使用ATM繳款：<br/>
									一、使用第一銀行自動提款機繳款步驟：<br/>
									 1.插入金融卡（IC金融卡）<br/>
									2.輸入密碼<br/>
									 3.選擇其他交易<br/>
									4.選擇一銀代收款<br/>
									 5.選擇其他代收款<br/>
									 6.輸入繳款類別：【銷帳編號前五碼】<br/>
									 7.輸入銷帳編號【銷帳編號後十一碼】<br/>
									 8.輸入繳款金額<br/>
									 9.確認輸入資料無誤後按確認鍵完成轉帳。<br/>
									<br/>
									二、使用其他金融機構具跨行轉帳功能之自動提款機繳款步驟：<br/>
									 1.插入金融卡（IC金融卡）<br/>
									 2.輸入密碼<br/>
									 3.選擇其他服務<br/>
									 4.選擇跨行轉帳<br/>
									 5.輸入銀行代號００７<br/>
									 6.輸入轉帳帳號：【即銷帳編號16位】<br/>
									 7.輸入轉帳金額<br/>
									 8.確認輸入資料無誤後按確認鍵完成轉帳。<br/>
									<br/>
									使用第一銀行網路銀行轉帳繳款：<br/>
									1.進入
									<a href="https://ibank.firstbank.com.tw/NetBank/index103.html" target="_blank">
										https://ibank.firstbank.com.tw/NetBank/index103.html
									</a>
									網頁點選網路銀行客戶專屬服務交易<br/>
									 2.輸入身分證統一編號、登入代號及登入密碼。<br/>
									 3.選擇轉帳類交易之代收款轉帳交易依電腦畫面進行網路銀行轉帳交易。<br/>
									 4.存戶編號請輸入：【銷帳編號共16位】。<br/>
									 5.輸入轉帳金額。<br/>
									 6.按確定。<br/>
									<br/>
									使用第一銀行電話語音銀行轉帳繳款：<br/>
									 1.撥打第一銀行電話語音銀行服務專線。<br/>
									 2.轉帳類按04。<br/>
									 3.代收款繳款按06<br/>
									 4.請輸入轉出帳號11位<br/>
									 5.請輸入電話語音密碼4位數<br/>
									 6.請輸入存戶編號【即銷帳編號共16位】<br/>
									 7.輸入繳款金額，輸入完畢請按＃鍵。<br/>
								</div>
							</section>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Webatm
