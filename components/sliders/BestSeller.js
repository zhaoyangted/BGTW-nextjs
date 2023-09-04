import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchByCatagory } from "../../redux/action/product";

const BestSellerSlider = () => {
    const [bestSeller, setBestSeller] = useState([]);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const request = await fetch(process.env.apiServer+`/api/product/hot/`,
        {credentials: 'include'});
        
        const allProducts = await request.json();
        // With Category
       /*  const allProducts = await fetchByCatagory("/static/product.json");

        // Best Seller
        const bestSellerProducts = allProducts.sort(function (a, b) {
            return a.totalSell > b.totalSell ? -1 : 1; 
        });*/

        setBestSeller(Object.values(allProducts)[3]);
    };

    return <>
        {bestSeller.slice(0, 3).map((product, i) => (
            <article className="row align-items-center hover-up" key={i}>
                <figure className="col-md-4 mb-0">
                    <Link href="/products/[id]" as={`/products/${product.d_id}`}>

                        <img src={process.env.s3Host+product.d_img1} alt="" />

                    </Link>
                </figure>
                <div className="col-md-8 mb-0">
                    <h6>
                        <Link href="/products/[id]" as={`/products/${product.d_id}`}>
                            {product.d_title}
                        </Link>
                    </h6>
                    <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                            <div className="product-rating" style={{ width: "90%" }}></div>
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

export default BestSellerSlider;
