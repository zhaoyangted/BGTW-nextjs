import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import styles from '../product.module.css';
const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
    img
}) => {
    const [quantity, setQuantity] = useState(1);
    
    
    const handleCart = (product) => {
        addToCart(product);
        toast("Product added to Cart !");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };

    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

    console.log(inCart);

    return (
        <>
            <section className=" mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50  mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>

                                            <div className="product-image-slider">
                                                <ThumbSlider img={img}  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className={styles.detailinfo}>
                                            {product.d_stock===0&&<span className="stock-status out-stock"> Sale Off </span>}
                                            <h2 className={styles.titledetail}>{product.d_title}</h2>
                                            <ul className={styles.productmeta}>
                                                <li >
                                                   <div className={styles.dtt}>商品品牌:</div>
                                                   <div className={styles.spec}><a href="#">{product.pbtitle}</a></div>
                                                </li>
                                                <li >
                                                <div className={styles.dtt}>商品編號:</div>
                                                    {/* <a href="#" rel="tag" className="me-1"> */}
                                                    <div className={styles.spec}>{product.d_model}</div>
                                                   {/*  </a> */}
                                                </li>
                                                <li>
                                                <div className={styles.dtt}>庫存數量:</div>
                                                <div className={styles.spec}><span className="in-stock text-success ml-5">{product.d_stock}</span></div>
                                                </li>
                                                <li>
                                                <div className={styles.dtt}>運費:</div>
                                                <div className={styles.spec}><span className="in-stock text-success ml-5">訂單滿NT${product.d_free}免運費</span></div>
                                                </li>
                                            </ul>
                                            <ul className={styles.productmeta}>
                                                {product.isMember!=="會員價"&&product.isNotAvail?
                                                <><li className="mb-5">
                                                    <div className={styles.dtt}>{product.isMember}:</div>
                                                    <div className={styles.spec}>NT${product.d_price}</div>
                                                </li> 
                                                <li className="mb-5">
                                                    {product.isNotAvail}:
                                                    <a href="#">資格不符</a>
                                                </li></>:
                                                <li className="mb-5">
                                                    <div className={styles.dtt}>市價:</div>
                                                    <div className={styles.spec}>NT${product.d_price}</div>
                                                </li>
                                                }
                                               {product.d_dprice!=0? <li className="mb-5">
                                               <div className={styles.dtt}>出清價:</div>
                                               <div className={styles.spec}>NT${product.d_dprice}</div>
                                                </li>:null}
                                                {product.d_sprice!=0? <li className="mb-5">
                                                <div className={styles.dtt}>促銷價:</div>
                                                <div className={styles.spec}>NT${product.d_sprice}</div>
                                                </li>:null}
                                                {product.isSalePrice? <li className="mb-5">
                                                <div className={styles.dtt}>特價:</div>
                                                <div className={styles.spec}>NT${product.isSalePrice}</div>
                                                </li>:null}
                                                {product.isBonus?<li>
                                                    <div className={styles.dtt}>獲得紅利:</div>
                                                    <div className={styles.spec}><span className="in-stock text-success ml-5">{product.d_bonus}%</span></div>
                                                </li>:null}
                                            </ul>
                                            <div className="product-detail-rating">
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ width: "90%" }}></div>
                                                    </div>
                                                    <span className="font-small ml-5 text-muted"> (32 reviews)</span>
                                                </div>
                                            </div>
                                            {/* <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">${product.d_price}</span>
                                                    <span>
                                                        <span className="save-price font-md color3 ml-15">{product.d_dPrice/product.d_price*100}% Off</span>
                                                        <span className="old-price font-md ml-15">{product.d_dPrice ? `$ ${product.d_sPrice}` : null}</span>
                                                    </span>
                                                </div>
                                            </div> */}

                                            {/* <div className="short-desc mb-30">
                                                <p className="font-lg">{product.d_title}</p>
                                            </div> */}
                                           {/*  <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">Color</strong>
                                                <ul className="list-filter color-filter">
                                                    {product.variations.map((clr, i) => (
                                                        <li key={i}>
                                                            <a href="#">
                                                                <span className={`product-color-${clr}`}></span>
                                                            </a>
                                                        </li>
                                                    ))} 
                                                </ul>
                                            </div>*/}
                                            <div className="attr-detail attr-size">
                                                <strong className="mr-10">Size</strong>
                                                <ul className="list-filter size-filter font-small">
                                                    <li className="active">
                                                        <a>M</a>
                                                    </li>
                                                    <li>
                                                        <a>L</a>
                                                    </li>
                                                    <li>
                                                        <a>XL</a>
                                                    </li>
                                                    <li>
                                                        <a>XXL</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            
                                            <div className="detail-extralink">
                                            <div className="detail-qty border radius">
                                                    <a onClick={(e) => (!inCart ? setQuantity(quantity > 1 ? quantity - 1 : 1) : decreaseQuantity(product?.d_id))} className="qty-down">
                                                        <i className="fi-rs-angle-small-down"></i>
                                                    </a>
                                                    <span className="qty-val">{inCart?.quantity || quantity}</span>
                                                    <a onClick={() => (!inCart ? setQuantity(quantity + 1) : increaseQuantity(product.d_id))} className="qty-up">
                                                        <i className="fi-rs-angle-small-up"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="detail-extralink">
                                                
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity: quantity || 1
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <a aria-label="Add To Wishlist" className="action-btn hover-up" onClick={(e) => handleWishlist(product)}>
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                    <a aria-label="Compare" className="action-btn hover-up" onClick={(e) => handleCompare(product)}>
                                                        <i className="fi-rs-shuffle"></i>
                                                    </a>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab product={product}/>
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">Related products</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
