import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchByCatagory } from "../../redux/action/product";
import SingleProduct from "./../ecommerce/SingleProduct";
import SingleProduct2 from "../ecommerce/SingleProduct2";

SwiperCore.use([Navigation]);

const RelatedSlider = ({product}) => {
    /* const [related, setRelated] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const allProducts = await fetchByCatagory("/static/product.json");
        setRelated(allProducts);
    }; */

    return (
        <>
            <Swiper
                //slidesPerView={4}
                //spaceBetween={30}
                spaceBetween={24}
                grid={{
                    rows: 2
                }}
                autoplay={true}
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="custom-class"
                breakpoints={{
                    480: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 4
                    },
                }}
            >
                {product?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct2 product={item} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_n">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
            
        </>
    );
};

export default RelatedSlider;
