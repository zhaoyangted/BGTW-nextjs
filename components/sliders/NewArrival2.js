import Link from "next/link";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { server } from "../../config/index";

SwiperCore.use([Navigation]);

const NewArrival2 = (allProducts) => {
    const [newArrival, setNewArrival] = useState(Object.values(allProducts.allProducts)[5]);

   /*  useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const request = await fetch(process.env.apiServer+`/api/product/hot/`,
        {credentials: 'include'});
        
        const allProducts = await request.json();
        setNewArrival(Object.values(allProducts)[5]);
    };
 */
    return <>
        {newArrival?.slice(0, 4).map((product, i) => (
            <article className="row align-items-center hover-up" key={i}>
                <figure className="col-md-4 mb-0">
                    <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }}
                         //as={`/products/info/${product.d_id}`}
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
                        >
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
                       {/*  <span className="old-price">{product.oldPrice && `$ ${product.oldPrice}`}</span> */}
                    </div>
                </div>
            </article>
        ))}
    </>;
};

export default NewArrival2;
