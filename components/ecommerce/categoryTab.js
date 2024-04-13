import React, { useEffect, useState } from "react"
import Cat1Tab from "../elements/FeaturedTab"
import Link from "next/link"
function CategoryTab(data) {
	const [active, setActive] = useState("1")
	const [catAll, setCatAll] = useState([])
	const [cats, setCats] = useState([])
	const [hotProd, setHotProd] = useState([])
	const catPAll = (data) => {
		if (data) {
			setCats(Object.keys(data.data))
			setCatAll(Object.values(data.data))
			setHotProd(Object.values(data.data)[0])
			setActive("1")
		}
	}

	useEffect(() => {
		if (data) catPAll(data)
	}, [data])

	return (
		<>
			<div
				className="section-title wow animate__animated animate__fadeIn"
				data-wow-delay="0"
				style={{ textAlign: "center" }}
			>
				<h3>人氣商品特賣</h3>
			</div>

			<ul className="nav nav-tabs links" id="myTab" role="tablist">
				{cats?.map((item, i) => {
					return (
						<li className="nav-item" key={i} role="presentation">
							<a
								aria-label={item}
								className={active === `${i + 1}` ? "nav-link   active" : "nav-link "}
								//data-bs-toggle="modal"
								style={{ whiteSpace: "nowrap", width: "70px", height: "40px", overflowX: "hidden" }}
								onClick={() => {
									setHotProd(catAll[`${i}`])
									setActive(`${i + 1}`)
								}}
							>
								{item /*.slice(0,4) +"..." */}
							</a>
						</li>
					)
				})}
			</ul>

			<div className="tab-content wow fadeIn animated">
				{cats?.map((item, i) => {
					return (
						<div className={active === `${i + 1}` ? "tab-pane fade show active" : "tab-pane fade"} key={i}>
							<div className="product-grid-4 row mb-30">
								<Cat1Tab products={hotProd} />
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}
export default CategoryTab
