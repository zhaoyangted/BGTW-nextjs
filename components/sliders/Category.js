import { useRouter } from "next/router";
import { connect } from "react-redux";
import SwiperCore, { A11y, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { updateProductCategory } from "./../../redux/action/productFiltersAction";
import useSWR from 'swr'
import { useEffect,useState } from "react";
SwiperCore.use([Navigation, Autoplay,A11y]);
const data = [
    {
        id: 1,
        title: "Cake & Milk",
        slug: "jeans",
        img: "cat-13.png",
        bg: "bg-9"
    },
    {
        id: 2,
        title: "Oganic Kiwi",
        slug: "shoe",
        img: "cat-12.png",
        bg: "bg-10"
    },
    {
        id: 3,
        title: "Peach",
        slug: "jacket",
        img: "cat-11.png",
        bg: "bg-11"
    },
    {
        id: 4,
        title: "Red Apple",
        img: "cat-9.png",
        bg: "bg-12"
    },
    {
        id: 5,
        title: "Snack",
        img: "cat-3.png",
        bg: "bg-13"
    },
    {
        id: 6,
        title: "Vegetables",
        img: "cat-1.png",
        bg: "bg-14"
    },
    {
        id: 7,
        title: "Strawberry",
        img: "cat-2.png",
        bg: "bg-15"
    },
    {
        id: 8,
        title: "Black plum",
        img: "cat-4.png",
        bg: "bg-12"
    },
    {
        id: 9,
        title: "Custard apple",
        img: "cat-5.png",
        bg: "bg-10"
    },
    {
        id: 10,
        title: "Coffe & Tea",
        img: "cat-14.png",
        bg: "bg-12"
    },
    {
        id: 11,
        title: "Headphone",
        img: "cat-15.png",
        bg: "bg-11"
    }
];
const CategorySlider = () => {


    const router = useRouter();
    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname:`/products/blist`,
            query: {
                id: category 
            }
        });

       // console.log("Click");
    };
    const fetcher = url => fetch(url,{credentials:'include'}).then(r => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer +"/api/brand/",fetcher)
    //console.log(data)
    /* let filteredList = [...data]
    filteredList = [
        ...filteredList.sort((a, b) => {
            if (b.d_num < a.d_num) return -1;
            if (b.d_num > a.d_num) return 1;
        }),
    ];
    const brands = filteredList.slice(0,12) */
    return (
        !loading&&<>
            <Swiper
                //modules={[Navigation, A11y]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1"
                }}
                autoHeight={true}
                className="custom-class"
                breakpoints={{
                    480: {
                        slidesPerView: 6
                    },
                    640: {
                        slidesPerView: 6
                    },
                    768: {
                        slidesPerView: 6
                    },
                    1024: {
                        slidesPerView: 6
                    },
                    1600: {
                        slidesPerView: 10
                    },
                    /* 1800:{
                        slidesPerView:3
                    },
                    2400: {
                        slidesPerView:3
                    } */
                }}
            >
                {data?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className={`card-2 bg-${i+1} wow animate__animated animate__fadeInUp`} onClick={(e) => selectCategory(e, item.d_id)}>
                            <figure className=" img-hover-scale overflow-hidden">
                                <a>
                                    <img src={`/assets/imgs/brands/${item.d_id}.webp`} alt="" />
                                </a>
                                
                            </figure>
                            
                               {/*  <a>{item.d_title}</a> */}
                            
                            <span>{item.d_num}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow" id="carausel-10-columns-arrows">
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-arrow-small-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-arrow-small-right"></i>
                </span>
            </div>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategorySlider);


// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// SwiperCore.use([Navigation]);

// const CategorySlider = () => {
//     return (
//         <>
//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 
//                 navigation={{
//                     prevEl: ".custom_prev",
//                     nextEl: ".custom_next",
//                 }}
//                 className="custom-class"
//             >
//                 <SwiperSlide>1</SwiperSlide>
//                 <SwiperSlide>2</SwiperSlide>
//                 <SwiperSlide>3</SwiperSlide>
//             </Swiper>

//             <div className="custom-nav">
//                 <button type="button" className="custom_prev">
//                     Prev
//                 </button>
//                 <button type="button" className="custom_next">
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

// export default CategorySlider;
