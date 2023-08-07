import React from "react";
import { useRouter } from 'next/router'
import Link from "next/link"
import Tags from "../ecommerce/Filter/Tags";

const Breadcrumb2 = ({parent, sub, subChild, noBreadcrumb,types,menuData}) => {
    const router = useRouter()
    //const titlex = router.query.cat
    const titlex = types?.d_title?types?.d_title:types?.d_stitle
    return <>
        <div className="page-header mt-30 mb-50">
        <div className="container-fluid">
            <div className="archive-header">
                <div className="row align-items-center">
                    <div className="col-xl-4">
                        <h2 className="mb-15 text-capitalize">{titlex ? titlex : types?.d_title}</h2>
                        <div className="breadcrumb">
                            <Link href="/" rel="nofollow"><i className="fi-rs-home mr-5"></i>首頁</Link>
                            {menuData&&<Link href={"/products/products_list/"+types?.TID} rel="nofollow">
                                <span></span> {menuData?.d_title} <span></span>
                            </Link>} 
                            <Link href="#">{menuData?null:<span></span>}{types?.d_title}</Link>
                            {/* {titlex} */}
                        </div>
                    </div>
                    <div className="col-xl-8 text-end d-none d-xl-block">
                        <Tags/>                            
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>;
};

export default Breadcrumb2;
