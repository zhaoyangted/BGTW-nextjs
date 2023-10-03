import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import useSWR from "swr"
import styles from '../components/about.module.css'

function About() {
	const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/homepage/about", fetcher)

	return (
		<>
			<Layout parent="首頁" /* sub="關於美麗平台" */ sub=" 關於美麗平台">
				<div className="container  pt-50">
					<div className="row">
						<div className="col-xl-10 col-lg-12 m-auto">
{/* 							<section className="row align-items-center mb-50">
								<div className="col-lg-6">
									<img
										src="/assets/imgs/page/about-1.png"
										alt=""
										className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4"
									/>
								</div>
								<div className="col-lg-6">
									<div className="pl-25">
										<h2 className="mb-30">Welcome to Nest</h2>
										<p className="mb-25">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
											labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
											nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id
											est laborum.
										</p>
										<p className="mb-50">
											Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos
											interpre.Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci
											eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor
											elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in
											voluptate id est laborum.
										</p>
									</div>
								</div>
							</section> */}
							<section className={styles.content_box}>
								<div className={styles.title01} >關於美麗平台</div>
								<div className={styles.user_editor} dangerouslySetInnerHTML={{__html:data?.AboutData ? data.AboutData : null}}></div>
								<div className={styles.store}>
									<a
										id="position"
										style={{ position: "relative", top: "-80px", display: "block", height: "0", overflow: "hidden" }}
									></a>
									{data?.AboutMap.map((m, i) => {
										return (
											<li key={i}>
												<h2>{m.d_title}</h2>
												<div className={styles.sbox}>
													<div className={styles.stxt}>
														<h3>地　　址：{m.d_address}</h3>
														<h3>電　　話：{m.d_tel}</h3>
														<h3>傳　　真：{m.d_fax}</h3>
														<h3>營業時間：{m.d_time}</h3>
													</div>
													<div className={styles.smap} dangerouslySetInnerHTML={{__html:m.d_link}}></div>
												</div>
											</li>
										)
									})}
								</div>
							</section>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default About
