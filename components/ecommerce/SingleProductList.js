import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProductList = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const handleCart = (product) => {
        addToCart(product);
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
        <div className="product-list mb-30">
            <div className="product-cart-wrap">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <div className="product-img-inner">
                            <Link
                                href="/[id]"
                                //as={`/${product.d_id}`}
                            >

                                <img
                                    className="default-img"
                                    src={process.env.s3Host+product.d_img1}
                                    alt=""
                                />
                                <img
                                    className="hover-img"
                                    src={process.env.s3Host+product.d_img2/* ?product.d_img2:product.d_img1 */}
                                    alt=""
                                />

                            </Link>
                        </div>
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

                    {/* <div className="product-badges product-badges-position product-badges-mrg">
                        {product.trending && (
                            <span className="hot">Hot</span>
                        )}
                        {product.created && (
                            <span className="new">New</span>
                        )}
                        {product.totalSell > 100 && (
                            <span className="best">Best Sell</span>
                        )}
                        {product.discount.isActive && (
                            <span className="sale">Sale</span>
                        )}
                        {product.discount.percentage >= 5 && (
                            <span className="hot">
                                {product.discount.percentage}%
                            </span>
                        )}
                    </div> */}
                </div>
                <div className="product-content-wrap">
                    <div className="product-category">
                        <Link href="/products">
                            {/* {product.brand} */}
                        </Link>
                    </div>
                    <h2>
                        <Link
                            href="/[id]"
                            //as={`/${product.d_id}`}
                        >
                            {product.d_title}
                        </Link>
                    </h2>
                    <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                            <div
                                className="product-rating"
                                style={{ width: "90%" }}
                            ></div>
                        </div>
                        <span className="font-small ml-5 text-muted">
                            {" "}
                            (4.0)
                        </span>
                        <span className="ml-30">500g</span>
                    </div>
                    <p className="mt-15 mb-15">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nam beatae consectetur, atque inventore
                        aliquam adipisci perspiciatis nostrum qui
                        consequatur praesentium?
                    </p>

                    <div className="product-price">
                        <span>${product.d_price} </span>
                        {/* <span className="old-price">{product.oldPrice && `$ ${product.oldPrice}`}</span> */}
                    </div>

                    <p className="mt-15">{product.d_title}</p>

                    <div className="mt-30 d-flex align-items-center">
                        <a
                            aria-label="Add To Cart"
                            className="btn"
                            onClick={(e) => handleCart(product)}
                        >
                            <i className="fi-rs-shopping-bag-add"></i>
                            Add to Cart
                        </a>
                        <a
                            onClick={(e) => handleCompare(product)}
                            className="add-wishlish ml-30 text-body font-sm font-heading font-weight-bold"
                        >
                            <i className="fi-rs-shuffle mr-5"></i>Add Compare
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

export default connect(null, mapDispatchToProps)(SingleProductList);
