import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct2 = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    

    const handleCart = (product) => {
        addToCart(product,1);
        toast("已加入購物車!");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("已加入比較 !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("已加入願望清單 !");
    };
    return <>
        <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
                <div className="product-img product-img-zoom">
                    <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }} 
                    //as={`/products/info/${product.d_id}`}
                    >

                        <img
                            className="default-img"
                            src={process.env.s3Host+product.d_img1}
                            alt=""
                        />
                        <img
                            className="hover-img"
                            src={product.d_img2?process.env.s3Host+product.d_img2:process.env.s3Host+product.d_img1}
                            alt=""
                        />

                    </Link>
                </div>
                <div className="product-action-1 d-none d-md-block">
                    <a
                        aria-label="快速預覽"
                        className="action-btn hover-up"
                        data-bs-toggle="modal"
                        // data-bs-target="#quickViewModal"
                        onClick={(e) => openQuickView(product)}
                    >
                        <i className="fi-rs-eye"></i>
                    </a>
                    <a
                        aria-label="加入願望清單"
                        className="action-btn hover-up"
                        onClick={(e) => handleWishlist(product)}
                    >
                        <i className="fi-rs-heart"></i>
                    </a>
                    <a
                        aria-label="加入比較"
                        className="action-btn hover-up"
                        onClick={(e) => handleCompare(product)}
                    >
                        <i className="fi-rs-shuffle"></i>
                    </a>
                </div>

                <div className="product-badges product-badges-position product-badges-mrg">
                    {product.Discount===1 && <span className="hot">折</span>}
                    {product.Discount===2 && <span className="new">特價</span>}
                    {/* {product.totalSell > 100 && (
                        <span className="best">Best Sell</span>
                    )}
                    {product.discount.isActive && (
                        <span className="sale">Sale</span>
                    )}
                    {product.discount.percentage >= 5 && (
                        <span className="hot">
                            {product.discount.percentage}%
                        </span>
                    )} */}
                </div>
            </div>
            <div className="product-content-wrap">
               {/*  <div className="product-category">
                    <Link href="/products">
                        {product.brand}
                    </Link>
                </div> */}
                <h2>
                    <Link href={{
                            pathname: "/products/info",
                            query: { id: product.d_id},
                        }}
                         //as={`/products/info/${product.d_id}`}
                        >
                        {product.d_title}
                    </Link>
                </h2>

              {/*   <div className=" product-rate  d-inline-block">
                    <div
                        className="product-rating"
                        style={{ width: "90%" }}
                    ></div> 
                </div>*/}

                <div className="product-price mt-10">
                    
                    {product.Chked==='Y'&&product.Lvtitle!=="會員價"?<><span>{product.Lvtitle} </span>
                    <span className="price">NT${product.d_price} </span>
                    <span className="old-price">NT${product.d_price1}</span>
                    </>
                    :<>
                    <span>市價NT$</span>
                    <span className="price">{product.d_price1 }</span>
                    </>
                    }
                </div>
                {/* <div className="sold mt-15 mb-15">
                    <div className="progress mb-5">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "50%" }}
                        ></div>
                    </div>
                    <span className="font-xs text-heading"> Sold: 90/120</span>
                </div> */}

                <a
                    className="btn w-100 hover-up"
                    onClick={(e) => handleCart(product)}
                >
                   <i className="fi-rs-shopping-cart-add mr-5"></i> 
                </a>
            </div>
        </div>
    </>;
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct2);
