//import Link from "next/link"
import React, { useEffect, useState } from "react"
// import { fetchByCatagory } from "../../redux/action/product";
//import { server } from "../../config/index"
import FeaturedSlider from "../sliders/Featured"
//import NewArrivalTabSlider from "../sliders/NewArrivalTab"
//import TrendingSlider from "../sliders/Trending"
import useSWR from "swr"
// import useSWR from 'swr'
function FeatchTabSlider() {
	const [active, setActive] = useState("1")
	const fetcher = (url) =>
		fetch(url, { credentials: "include" })
			.then((r) => r.json())
			.catch()
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/product/newproducts/", fetcher)
	if (data) {
		return (
			<>
				<div className="section-title wow animate__animated animate__fadeIn">
					<h3 className="">最新產品初登場</h3>
				</div>

				<div className="row">
					{/* <div className="col-lg-3 d-none d-lg-flex wow animate__animated animate__fadeIn">
					<div className="banner-img style-2">
						<div className="banner-text">
							<h2 className="mb-100">新鮮出爐</h2>

							<Link href="/products" className="btn btn-xs">
								快來看看<i className="fi-rs-arrow-small-right"></i>
							</Link>
						</div>
					</div>
				</div> */}
					<div className="col-lg-12 col-md-24">
						<div className="tab-content wow fadeIn animated" id="myTabContent">
							{/* {data?.map((item, i) => {
								return ( */}
									<div className={active === "1" ? "tab-pane fade show active" : "tab-pane fade"} /*  key={i} */>
										<div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
											<FeaturedSlider products={data} />
										</div>
									</div>
							{/* 	)
							})} */}
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default FeatchTabSlider
