import Link from "next/link";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
const CompareTable = ({ data, features, deleteFromCompare, addToCart }) => {
 
    

    const handleCart = (product) => {
        addToCart(product);
        toast("產品已加入購物車!");
    };
    return (
        <table className="table text-center">
            <tbody>
                {features.map((feature,i) => (
                    <tr key={i}>
                        <th
                            className="text-muted font-md fw-600"
                            style={{ textTransform: "capitalize" }}
                        >
                            {feature}
                        </th>
                        {data.map((product,i) =>
                            feature == "產品預覽" ? (
                                <td className="row_img" key={i}>
                                    <img style={{width:"30%"}}src={process.env.s3Host+product.d_img1} />
                                </td>
                            ) : feature == "產品名稱" ? (
                                <td className="product_name" key={i}>
                                    <h5>
                                        <a href={"/products/"+product.d_id}>{product.d_title}</a>
                                    </h5>
                                </td>
                            ) : feature == "產品價格" ? (
                                <td className="product_price" key={i}>
                                    <span className="price">${product.d_price}</span>
                                </td>
                            ) : feature == "rating" ? (
                                <td key={i}>
                                    <div className="rating_wrap">
                                        {product.review >= 0 && (
                                            <>
                                                <div className="product-rate d-inline-block">
                                                    <div
                                                        className="product-rating"
                                                        style={{
                                                            width: `${product.ratingScore}%`,
                                                        }}
                                                    ></div>
                                                </div>

                                                <span className="rating_num">
                                                    ({product.review})
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                            ) : feature == "產品描述" ? (
                                <td className="row_text font-xs" key={i}>
                                    <p>{product.d_desc}</p>
                                </td>                
                            ) : feature == "產品庫存" ? (
                                <td className="row_stock" key={i}>
                                    {product.d_stock >= 0 ? (
                                        <span>{product.d_stock}</span>
                                    ) : (
                                        <span className="text-danger font-weight-bold">
                                            無庫存
                                        </span>
                                    )}
                                </td>
                            ) : feature == "產品紅利" ? (
                                <td className="row_weight" key={i}>
                                    {product.d_bonus}
                                </td>
                            ) : feature == "產品編號" ? (
                                <td className="row_dimensions" key={i}>{product.d_model}</td>
                            ) : feature == "產品購買" ? (
                                <td className="row_btn" key={i}>
                                    {product.d_stock >= 0 ? (
                                        <button
                                            className="btn  btn-sm"
                                            onClick={(e) => handleCart(product)}
                                        >
                                            <i className="fi-rs-shopping-bag mr-5"></i>
                                            添加購物車
                                        </button>
                                    ) : (
                                        <Link href="/contact" legacyBehavior>
                                        <button className="btn  btn-sm btn-secondary">
                                            <i className="fi-rs-headset mr-5"></i>
                                            聯繫我們
                                        </button>
                                        </Link>
                                        
                                    )}
                                </td>
                            ) : feature == " " ? (
                                <td className="row_remove" key={i}>
                                    <a
                                        onClick={() =>
                                            deleteFromCompare(product.d_id)
                                        }
                                    >
                                        <i className="fi-rs-trash mr-5"></i>
                                        <span>移出</span>
                                    </a>
                                </td>
                            ) : null
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const mapDispatchToProps = {
    addToCart,
};

export default connect(null, mapDispatchToProps)(CompareTable);
