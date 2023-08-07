import React, {useState} from 'react'
import Link from "next/link"
//import BlogSidebar from "../components/elements/BlogSidebar";
import Layout from "../../components/layout/Layout"
import useSWR from "swr"
import styles from "../../components/qa.module.css"
import Qainfo from '../../components/qa/Qainfo'
function Qa() {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/qa/", fetcher)
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
			<Layout parent="首頁" /* sub="Pages" */ subChild=" > 常見問題">
				<div className="page-content pt-50">
					<div className="container">
						<section className={styles.content_box}>
							<div className={styles.title01}>常見問題 Q&A</div>
							<div className={styles.title02}>常見問題</div>
							<div className={styles.qa}>
								{data?.HotQaData?.map((h, i) => {
									return (
										<li key={i}>
											<a onClick={()=>handleModalOpen(h.d_id)}>
												<div className={styles.tt}>
													<b>Q</b>
													{h.d_title}
												</div>
											</a>
										</li>
									)
								})}
							</div>
							<div className={styles.qa_row}>
								{data?.QaData
									? Object.keys(data?.QaData).map((q, index) => {
											return (
												<div className="col-xs-12 col-md-6" key={index}>
													<div className={styles.accordion}onClick={(e)=>{e.preventDefault;handleToggle(index)}}>{q}</div>
													<div className={styles.panel} style={isActive.key == index ? {maxHeight: "460px"} :{maxHeight: "0px"}}>
														<div className={styles.qa02}>
															{Object.values(data.QaData)[index]?.map((qv, i) => {
																return (
																	<li key={i}>
																		<a onClick={()=>handleModalOpen(qv.d_id)}>
																			<div className={styles.tt}>
																				<b>Q</b>
																				{qv.d_title}
																			</div>
																		</a>
																	</li>
																)
															})}
															{/* <div className={styles.title04}>
																<Link href={"/qa/qalist/" + q.TID}>查看更多</Link>
															</div> */}
														</div>
													</div>
												</div>
											)
									  })
									: null}
							</div>
						</section>
                        {id!==0&&<Qainfo modal={modal} id={id} closeQainfolistModal={handleModalClose}/>}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Qa
