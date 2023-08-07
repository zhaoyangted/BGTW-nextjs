import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import styles from '../components/account.module.css'
import Link from "next/link";
import {useState, useEffect} from 'react'
import axios from "axios";
import {
    clearCart,
    closeCart,
    decreaseQuantity,
    deleteFromCart,
    increaseQuantity,
    openCart
} from "../redux/action/cart";
import { number } from "prop-types";

const Cart = ({
    openCart,
    cartItems,
    activeCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    clearCart,
}) => {
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.d_price * item.quantity));
        /* if (apiData?.OneFreight?.d_freight) {console.log(price);
        return price+parseInt(apiData?.OneFreight?.d_freight) }
        else {console.log(price);return price} */
        return price;
    };
    const [apiData,setApiData] = useState({})
    useEffect(()=>{
		const point = async () => {
				let str = '';
				cartItems?.map((p,i)=>{
					p.d_id?
					str=str+p.d_id+'@#'+p.quantity+'@#;'
					:null;
				})
				str = str.replace(/;\s*$/, "");
				const res = await axios.post(
				process.env.apiServer+"/api/cart/cart/",
				{
					cart:str
				});
				setApiData(res.data)
				//return res.data['BonusTotal']
			}
		point()
	},[cartItems])
    return <>
        <Layout parent="首頁" sub=">" subChild="購物車">
            <section className={styles.content_box}>
                <div className="container">
                    <section className="content_box">
                        <div className="col-lg- mb-40">
                            <h1 className={styles.title01}>購物清單</h1>
                            <div className="d-flex justify-content-between">
                                <h6 className="text-body">
                                    購物車有{" "}
                                    <span className="text-brand">{cartItems.length}</span>{" "}
                                    件商品
                                </h6>
                                <h6 className="text-body">
                                    <a onClick={clearCart} className="text-muted">
                                        <i className="fi-rs-trash mr-5"></i>
                                        清空購物車
                                    </a>
                                </h6>
                            </div>
                        </div>
                    </section>
                    <section className={styles.cart01}>
                        <div className="col-lg-">
                            <div className="table-responsive shopping-summery">
                                {cartItems.length <= 0 && "No Products"}
                                <table
                                    className={
                                        cartItems.length > 0
                                            ? "table table-wishlist"
                                            : "d-none"
                                    }
                                >
                                    <thead>
                                        <tr className="main-heading">
                                            <th className="custome-checkbox start pl-30" colSpan="2">
                                                商品
                                            </th>
                                            <th scope="col">單價</th>
                                            <th scope="col">數量</th>
                                            <th scope="col">小計</th>
                                            <th scope="col" className="end">
                                                移除
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, i) => (
                                            <tr key={i}>
                                                <td className="image product-thumbnail">
                                                    <img
                                                        src={
                                                            "/"+item.d_img1
                                                        }
                                                    />
                                                </td>

                                                <td className="product-des product-name">
                                                    <h6 className="product-name">
                                                        <Link href={"/products/"+item.d_id}>

                                                            {item.d_title}

                                                        </Link>
                                                    </h6>
                                                    <div className="product-rate-cover">
                                                        {/* <div className="product-rate d-inline-block">
                                                            <div
                                                                className="product-rating"
                                                                style={{
                                                                    width: "90%",
                                                                }}
                                                            ></div>
                                                        </div> */}
                                                        <span className="font-small ml-5 text-muted">
                                                            {/* {apiData?.Cart[i]?.d_model} */}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td
                                                    className="price"
                                                    data-title="Price"
                                                >
                                                    <div className={styles.price}>
                                                        <span>
                                                        NT${item.d_price}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td
                                                    className="text-center detail-info"
                                                    data-title="Stock"
                                                ><div className="detail-extralink mr-15">
                                                    <div className="detail-qty border radius ">
                                                        <a
                                                            onClick={(e) =>
                                                                decreaseQuantity(
                                                                    item.d_id
                                                                )
                                                            }
                                                            className="qty-down"
                                                        >
                                                            <i className="fi-rs-angle-small-down"></i>
                                                        </a>
                                                        <span className="qty-val">
                                                            {item.quantity}
                                                        </span>
                                                        <a
                                                            onClick={(e) =>
                                                                increaseQuantity(
                                                                    item.d_id
                                                                )
                                                            }
                                                            className="qty-up"
                                                        >
                                                            <i className="fi-rs-angle-small-up"></i>
                                                        </a>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className="text-right"
                                                    data-title="Cart"
                                                >
                                                    <div className={styles.price}>
                                                        <span>
                                                        $
                                                        {item.quantity *
                                                            item.d_price}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td
                                                    className="action"
                                                    data-title="Remove"
                                                >
                                                    <a
                                                        onClick={(e) =>
                                                            deleteFromCart(
                                                                item.d_id
                                                            )
                                                        }
                                                        className="text-muted"
                                                    >
                                                        <i className="fi-rs-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-end"
                                            >
                                                {cartItems.length > 0 && (
                                                    <a
                                                        onClick={clearCart}
                                                        className="text-muted"
                                                    >
                                                        <i className="fi-rs-cross-small"></i>
                                                        清空購物車
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-action text-end">
                                <a className="btn ">
                                    <i className="fi-rs-shopping-bag mr-10"></i>
                                    繼續購物
                                </a>
                            </div>
                            <div className="divider center_icon mt-50 mb-50">
                                <i className="fi-rs-fingerprint"></i>
                            </div>
                            <div className="row mb-50">
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-30 mt-50">
                                        <div className="heading_s1 mb-3">
                                            {/* <h4>Apply Coupon</h4> */}
                                        </div>
                                        <div className="total-amount">
                                            <div className="left">
                                                {/* <div className="coupon">
                                                    <form
                                                        action="#"
                                                        target="_blank"
                                                    >
                                                        <div className="form-row row justify-content-center">
                                                            <div className="form-group col-lg-6">
                                                                <input
                                                                    className="font-medium"
                                                                    name="Coupon"
                                                                    placeholder="Enter Your Coupon"
                                                                />
                                                            </div>
                                                            <div className="form-group col-lg-6">
                                                                <button className="btn  btn-sm">
                                                                    <i className="fi-rs-label mr-10"></i>
                                                                    Apply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="border p-md-4 p-30 border-radius cart-totals">
                                        <div className="heading_s1 mb-3">
                                            <h4>購物車小計</h4>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td className="cart_total_label">
                                                            小計
                                                        </td>
                                                        <td className="cart_total_amount">
                                                            <span className="font-lg fw-900 text-brand">
                                                                $ {price()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cart_total_label">
                                                            一般運費
                                                        </td>
                                                        <td className="cart_total_amount">
                                                            <i className="ti-gift mr-5"></i>
                                                            {apiData?.OneFreight?.d_freight}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cart_total_label">
                                                            大型運費
                                                        </td>
                                                        <td className="cart_total_amount">
                                                            <i className="ti-gift mr-5"></i>
                                                            {apiData?.BigFreight}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td className="cart_total_label">
                                                        訂單小計滿{apiData?.OneFreight?.d_free}元，免一般運費
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cart_total_label">
                                                            小計
                                                        </td>
                                                        <td className="cart_total_amount">
                                                            <strong>
                                                                <span className="font-xl fw-900 text-brand">
                                                                    $
                                                                    {price()+parseInt(apiData?.OneFreight?.d_freight)}
                                                                </span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                    <td className="cart_total_label">
                                                    本次訂單累計紅利
                                                        </td>
                                                        <td className="cart_total_amount">
                                                            <strong>
                                                                <span className="font-xl fw-900 text-brand">
                                                                    
                                                                    {apiData?.BonusTotal}
                                                                </span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <a href="/checkout" className="btn ">
                                            <i className="fi-rs-box-alt mr-10"></i>
                                            結帳
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </Layout>
    </>;
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
    activeCart: state.counter,
});

const mapDispatchToProps = {
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    openCart,
    clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
