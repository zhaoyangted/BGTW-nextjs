import { Modal } from "react-responsive-modal"
import useSWR from "swr"
import styles from "../../components/qa.module.css"

const Qainfo = ({ modal, closeQainfolistModal, id }) => {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/qa/qainfo/" + id, fetcher)
	console.log(data)
	return (
		<>
			{data && (
				<Modal open={modal} onClose={closeQainfolistModal} center={true} classNames={{ modal: "full-modal" }}>
					<section className={styles.content_box}>
						<div className={styles.qa_view}>
							<li>
								<div className={styles.tt}>
									<b>Q</b>
									{data?.dbdata?.d_title}
								</div>
							</li>
						</div>
						<div className={styles.qa_view}>
							<div className={styles.a}>A</div>
							<div className={styles.abox}>
								<div className={styles.user_editor} dangerouslySetInnerHTML={{ __html: data?.dbdata?.d_content }}></div>
							</div>
						</div>

						{/* <div className={styles.title02} style={{ marginTop: "50px" }}>
						相關問題
					</div>
					<div className={styles.qa03}>
						<div className="center" style={{ marginTop: "30px" }}>
							<a href="javascript:history.back(1)" className="btn-style01 hvr-bob">
								回上一頁
							</a>
						</div>
					</div> */}
					</section>
				</Modal>
			)}
		</>
	)
}
export default Qainfo
