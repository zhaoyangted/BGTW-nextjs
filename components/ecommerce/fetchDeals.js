import React, { useEffect, useState } from "react"
import { server } from "../../config/index"
import Deals1 from "../elements/Deals1"
import useSWR from "swr"
function FeatchDeals() {
	const [deals, setDeals] = useState([])
	const fetcher = (url) =>
		fetch(url, { credentials: "include" })
			.then((r) => r.json())
			.catch()
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/product/newproducts/", fetcher)
	/*  const dealsProduct = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        // Discount
        const discountProduct = allProducts.filter(
            (item) => item.discount.isActive
        );

        setDeals(discountProduct);

    };

    useEffect(() => {
        dealsProduct();
    }, []); */

	// console.log(deals);

	if (data?.length > 0) {
		return (
			<>
				<section className="section-padding pb-5">
					<div className="container">
						<div className="section-title wow animate__animated animate__fadeIn" data-wow-delay="0">
							{/* <Link href="/products" className="show-all">
								All Deals<i className="fi-rs-angle-right"></i>
							</Link> */}
							<h3 className="">本日優惠</h3>
						</div>
						<div className="row">
							{data?.slice(0, 4).map((product, i) => (
								<div className="col-xl-3 col-lg-4 col-md-6" key={i}>
									<Deals1 product={product} />
								</div>
							))}
						</div>
					</div>
				</section>
			</>
		)
	}
}
export default FeatchDeals
