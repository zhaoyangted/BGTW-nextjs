import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import {
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist
} from "../redux/action/wishlistAction";

const Wishlist = ({
    wishlist,
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist,
    addToCart,
}) => {
    

    const handleCart = (product) => {
        addToCart(product);
        toast("加入購物車成功 !");
    };
    return (
        <>
            <Layout parent="首頁" /* sub="Shop"  */subChild=" > 我的最愛">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                {wishlist.items.length > 0 ? (
                                    <div className="table-responsive shopping-summery">
                                        <table className="table table-wishlist">
                                            <thead>
                                                <tr className="main-heading">
                                                    <th className="custome-checkbox start pl-30" colSpan="2">
                                                        產品
                                                    </th>
                                                    <th scope="col">價格</th>
                                                    <th scope="col">
                                                        庫存
                                                    </th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col" className="end">
                                                        移出
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishlist.items.map(
                                                    (product, i) => (
                                                        <tr className="pt-30" key={i}>
                                                            <td className="image product-thumbnail pt-40">
                                                                <img
                                                                    src={process.env.s3Host+product.d_img1}
                                                                    /* src={
                                                                        product
                                                                            .images[0]
                                                                            .img
                                                                    } */
                                                                    alt=""
                                                                    className="img-fluid"
                                                                />
                                                            </td>

                                                            <td className="product-des product-name">
                                                                <h6 className="product-name  mb-10">
                                                                    <a>
                                                                        {
                                                                            product.d_title
                                                                        }
                                                                    </a>
                                                                </h6>
                                                                <div className="product-rate-cover">
                                                                    <div className="product-rate d-inline-block">
                                                                        <div
                                                                            className="product-rating"
                                                                            style={{
                                                                                width: "90%",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="font-small ml-5 text-muted">
                                                                        {" "}
                                                                        (4.0)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td
                                                                className="price"
                                                                data-title="Price"
                                                            >
                                                                <h3 className="text-brand">
                                                                    $
                                                                    {
                                                                        product.d_price
                                                                    }
                                                                </h3>
                                                            </td>
                                                            <td
                                                                className="text-center detail-info"
                                                                data-title="Stock"
                                                            >
                                                                {product.stock ===
                                                                0 ? (
                                                                    <span className="stock-status out-stock mb-0">
                                                                        無庫存
                                                                    </span>
                                                                ) : (
                                                                    <span className="stock-status in-stock mb-0">
                                                                        有庫存
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                data-title="Cart"
                                                            >
                                                                {product.d_stock ===
                                                                0 ? (
                                                                    <button className="btn btn-sm btn-secondary" onClick={()=>Router.push("/contact")}>
                                                                        聯繫我們
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-sm"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleCart(
                                                                                product
                                                                            )
                                                                        }
                                                                    >
                                                                        加入購物車
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="action"
                                                                data-title="移出"
                                                            >
                                                                <a
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteFromWishlist(
                                                                            product.d_id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fi-rs-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-right">
                                            <span
                                                className="clear-btn"
                                                onClick={clearWishlist}
                                            >
                                                全部移出
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <h4 className="mb-0">無產品</h4>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    closeWishlistModal,
    deleteFromWishlist,
    clearWishlist,
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
