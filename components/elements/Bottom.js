import React from "react";
import Link from "next/link"
import BestSellerSlider from "../sliders/BestSeller";
import TrendingSlider2 from "../sliders/Trending2";
import NewArrival2 from "../sliders/NewArrival2";
import TopRatedSlider from "../sliders/TopRated";
const Bottom = (data) => {
    //console.log(data)
    return (
        <>
            <section className="section-padding mb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-6 mb-sm-5 mb-md-0 wow animate__animated animate__fadeInUp" data-wow-delay="0">
                            <h4 className="section-title style-1 mb-30  animated animated">熱賣TOP</h4>
                            <div className="product-list-small  animated animated">
                                <BestSellerSlider allProducts={data.data}/>                                
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-6 mb-md-0 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                            <h4 className="section-title style-1 mb-30  animated animated">人氣熱銷</h4>
                            <div className="product-list-small  animated animated">
                                <TrendingSlider2 allProducts={data.data}/>                               
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-6 mb-sm-5 mb-md-0 d-none d-lg-block wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                            <h4 className="section-title style-1 mb-30  animated animated">新品推薦</h4>
                            <div className="product-list-small  animated animated">
                                <NewArrival2 allProducts={data.data}/>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-6 mb-sm-5 mb-md-0 d-none d-xl-block wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                            <h4 className="section-title style-1 mb-30  animated animated">獨家精選</h4>
                            <div className="product-list-small  animated animated">
                                <TopRatedSlider allProducts={data.data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Bottom;
