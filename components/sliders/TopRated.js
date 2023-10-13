import Link from "next/link";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { fetchByCatagory } from "../../redux/action/product";

SwiperCore.use([Navigation]);

const TopRatedSlider = () => {
    const [discount, setDiscount] = useState([]);

    // console.log(discount);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
       /*  // With Category
        const allProducts = await fetchByCatagory("/static/product.json");

        // Discount
        const discountProduct = allProducts.filter(
            (item) => item.discount.isActive
        ); */
        const request = await fetch(process.env.apiServer+`/api/product/hot/`,
        {credentials: 'include'});
        
        const allProducts = await request.json();
        setDiscount(Object.values(allProducts)[1]);
    };
    return <>
            {discount.slice(0,4).map((product, i) => (
                <article className="row align-items-center hover-up" key={i}>
                <figure className="col-md-4 mb-0">
                    <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }}
                       // as={`/products/${product.d_id}`}
                        ><img src={process.env.s3Host+product.d_img1} alt="" /></Link>
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


export default TopRatedSlider;
