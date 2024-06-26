import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const handleCart = (product) => {
        addToCart(product,1);
        toast("已加入購物車 !");
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
        <div className="product-cart-wrap pt-30 pb-30">
            <div className="product-img-action-wrap">
                <div className="product-img product-img-zoom">
                    <Link
                        href={{
                            pathname: "/products/info",
                            query: { id: product?.d_id},
                        }}
                        
                        //as={`/products/info/${product.d_id}/`}
                    >

                        <img
                            className="default-img"
                            src={process.env.s3Host+product?.d_img1}
                            alt=""
                        />
                        <img
                            className="hover-img"
                            src={product?.d_img2?process.env.s3Host+product.d_img2:process.env.s3Host+product?.d_img1}
                            alt=""
                        />

                    </Link>
                </div>
                <div className="product-action-1  d-none d-md-block">
                    <a
                        aria-label="快速預覽"
                        className="action-btn hover-up"
                        data-bs-toggle="modal"
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
                    {product.d_sprice !=="0" && <span className="hot">熱</span>}
                    {/* {product.created && <span className="new">New</span>}
                    {product.totalSell > 100 && (
                        <span className="best">Best Sell</span>
                    )} */}
                    {product.d_dprice!=="0" && (
                        <span className="sale">特價</span>
                    )}
                    {/* {product.d_dprice!==0 && (
                        <span className="hot">
                            {product.d_dprice}
                        </span>
                    )} */}
                </div>
            </div>
            <div className="product-content-wrap">
                {/* <div className="product-category">
                    <Link href="/products">
                        {product?.brand}
                    </Link>
                </div> */}
                <h2>
                    <Link
                        href={{
                            pathname: "/products/info",
                            query: { id: product?.d_id},
                        }}
                        //as={`/products/info/${product.d_id}/`}
                    >
                        {product?.d_title}
                    </Link>
                </h2>

                {/* <div className="product-rate-cover">
                    <div className="product-rate d-inline-block">
                        <div
                            className="product-rating"
                            style={{ width: "90%" }}
                        ></div>
                    </div>
                    <span className="font-small ml-5 text-muted">
                        {" "}
                        ({product.ratingScore})
                    </span>
                </div> */}

                {/* <div>
                    <span className="font-small text-muted">
                        By <Link href="/vendor/1">NestFood</Link>
                    </span>
                </div> */}

                <div className="product-card-bottom">
                    <div className="product-price">
                        {product?.Chked==='Y'?
                        <>
                        <span>{product?.Lvtitle}${product.d_price} </span>
                        <span className="old-price">市價:${product?.d_price1 && `${product?.d_price1}`}</span>
                        </>
                        :<>
                        <span className="price">市價:${product?.d_price1 && `${product?.d_price1}`}</span>
                        </>
                        }
                    </div>
                    
                </div>
                <div className="product-card-bottom" >
                <div className="add-cart">
                        <a
                            className="add"
                            onClick={(e) => product.d_stock>0?handleCart(product):null}
                            
                        >
                          +  <i className="fi-rs-shopping-cart mr-5"></i> 
                        </a>
                    </div>
                </div>
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

export default connect(null, mapDispatchToProps)(SingleProduct);
