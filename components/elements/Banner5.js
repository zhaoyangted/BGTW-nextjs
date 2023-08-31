import React from "react";
import Link from "next/link"
const Banner5 = ({data}) => {
    return <>
    
        
                <div className="commBannBx"  >
                   
                    <div className="commBannItm">
                    {data?.map((d,i)=>{
                        return ( 
                        <ul key={i}>
                          <a href={d.d_link} target="_BLANK">
                            <li className="comm_phtBox">
                                <img src={process.env.s3Host+d.d_img} alt=""/>
                            </li>
                            <li className="comm_TxBx">{d.d_title}
                            </li>
                          </a>
                        </ul> )
                    })}
                    </div>
                   
                </div>
            
        
    
        {/* <div classNameName="col-lg-4 col-md-6">
            <div
                classNameName="banner-img wow animate__animated animate__fadeInUp"
                data-wow-delay="0"
            >
                <img src="/assets/imgs/banner/banner-1.png" alt="" />
                <div classNameName="banner-text">
                    <h4>
                        Everyday Fresh & <br />
                        Clean with Our
                        <br />
                        Products
                    </h4>
                    <Link href="/products" classNameName="btn btn-xs">Shop Now<i classNameName="fi-rs-arrow-small-right"></i>
                    </Link>
                </div>
            </div>
        </div>
        <div classNameName="col-lg-4 col-md-6">
            <div
                classNameName="banner-img wow animate__animated animate__fadeInUp"
                data-wow-delay=".2s"
            >
                <img src="/assets/imgs/banner/banner-2.png" alt="" />
                <div classNameName="banner-text">
                    <h4>
                        Make your Breakfast
                        <br />
                        Healthy and Easy
                    </h4>
                    <Link href="/products" classNameName="btn btn-xs">Shop Now<i classNameName="fi-rs-arrow-small-right"></i>
                    </Link>
                </div>
            </div>
        </div>
        <div classNameName="col-lg-4 d-md-none d-lg-flex">
            <div
                classNameName="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                data-wow-delay=".4s"
            >
                <img src="/assets/imgs/banner/banner-3.png" alt="" />
                <div classNameName="banner-text">
                    <h4>
                        The best Organic <br />
                        Products Online
                    </h4>
                    <Link href="/products" classNameName="btn btn-xs">Shop Now<i classNameName="fi-rs-arrow-small-right"></i>
                    </Link>
                </div>
            </div>
        </div> */}
    </>;
};

export default Banner5;
