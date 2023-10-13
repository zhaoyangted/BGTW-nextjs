import Link from "next/link";
import React, { useEffect, useState } from "react";

import { fetchByCatagory } from "../../redux/action/product";

const TrendingSlider = () => {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
/* 
        // With Category
        const allProducts = await fetchByCatagory("/static/product.json");

        const trendingItem = allProducts.filter((item) => item.trending); */
        const request = await fetch(process.env.apiServer+`/api/product/hot/`,
        {credentials: 'include'});
        
        const allProducts = await request.json();
        setTrending(Object.values(allProducts)[4]);
    };


    return <>
        {trending.slice(0, 4).map((product, i) => (
                <article className="row align-items-center hover-up" key={i}>
                <figure className="col-md-4 mb-0">
                    <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }}
                        //as={`/products/${product.d_id}`}
                        > 
                        <img src={process.env.s3Host+product.d_img1} alt="" />
                        </Link>
                </figure>
                <div className="col-md-8 mb-0">
                    <h6>
                        <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }}
                            //as={`/products/info/${product.d_id}`}
                            >{product.d_title}</Link>
                    </h6>
                    <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                            <div className="product-rating" style={{ "width": "90%" }}></div>
                        </div>
                        <span className="font-small ml-5 text-muted"> (4.0)</span>
                    </div>
                    <div className="product-price">
                        <span>${product.d_price} </span>
                        {/* <span className="old-price">{product.oldPrice && `$ ${product.oldPrice}`}</span> */}
                    </div>
                </div>
            </article>
            ))}
    </>;
};

export default TrendingSlider;
