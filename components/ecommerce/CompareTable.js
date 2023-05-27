import Link from "next/link";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
const CompareTable = ({ data, features, deleteFromCompare, addToCart }) => {
 
    

    const handleCart = (product) => {
        addToCart(product);
        toast("Product added to Cart !");
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
                            feature == "preview" ? (
                                <td className="row_img" key={i}>
                                    <img src={product.d_img1} />
                                </td>
                            ) : feature == "name" ? (
                                <td className="product_name">
                                    <h5>
                                        <a href="#">{product.d_title}</a>
                                    </h5>
                                </td>
                            ) : feature == "price" ? (
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
                            ) : feature == "description" ? (
                                <td className="row_text font-xs" key={i}>
                                    <p>{product.d_desc}</p>
                                </td>                
                            ) : feature == "stock" ? (
                                <td className="row_stock" key={i}>
                                    {product.d_stock >= 0 ? (
                                        <span>In Stock</span>
                                    ) : (
                                        <span className="text-danger font-weight-bold">
                                            Out of stock
                                        </span>
                                    )}
                                </td>
                            ) : feature == "weight" ? (
                                <td className="row_weight" key={i}>
                                    {product.weight} gram
                                </td>
                            ) : feature == "dimensions" ? (
                                <td className="row_dimensions">N/A</td>
                            ) : feature == "buy" ? (
                                <td className="row_btn" key={i}>
                                    {product.d_stock >= 0 ? (
                                        <button
                                            className="btn  btn-sm"
                                            onClick={(e) => handleCart(product)}
                                        >
                                            <i className="fi-rs-shopping-bag mr-5"></i>
                                            Add to cart
                                        </button>
                                    ) : (
                                        <Link href="/contact" legacyBehavior>
                                        <button className="btn  btn-sm btn-secondary">
                                            <i className="fi-rs-headset mr-5"></i>
                                            Contact Us
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
                                        <span>Remove</span>
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
