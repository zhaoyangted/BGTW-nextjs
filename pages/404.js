/* <?php
  $WebConfigData=$this->webmodel->GetWebData();
?> */

import Link from "next/link"
import styles from "../components/404.module.css"
import { useRouter } from "next/router"
/* <!DOCTYPE html> */
export default function Custom404() {
	const router = useRouter()
	return (
	<div className={styles.e404} style={{ marginTop: "5%",textAlign:"center" }}>
		<div style={{ margin: "0 0 10px 0" }}>
			<img style={{verticalAlign: "top"}} src="https://www.jddt.tw/images/404.png" />
		</div>
		<dd className={styles.error}>ERROR</dd>
		<dd className={styles.text}>
			此網頁不存在，請您點選下列網址，
			<br />
			進入{/* <? echo $WebConfigData[2] ?> */}首頁：
			<Link href="/">{/* <? echo base_url() ?> */}</Link>
		</dd>
		<dd className={styles.topbtn}>
			<input className={styles.btn} 
            type="button"
            value="返回到剛才的頁面"
            onClick={(e) => {e.preventDefault;router.back()}}
            />
		</dd>
	</div>
    )
}
