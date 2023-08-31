import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import Deals1 from "../elements/Deals1";
import useSWR from "swr"
function FeatchDeals() {
    const [deals, setDeals] = useState([]);
    const fetcher = (url) =>
		fetch(url, { credentials: "include" })
			.then((r) => r.json())
			.catch()
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/product/newproducts", fetcher)
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

    return (
        <>

            <div className="row">
            {data?.slice(0,4).map((product, i) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                    <Deals1 product={product}/>
                </div>
                ))}
            </div>
        </>
    );
}
export default FeatchDeals;
