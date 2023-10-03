
import SingleProduct from "../ecommerce/SingleProduct";

const FeaturedTab = ({ products }) => {
    const showItem= 10
    return (
        <>
            {products.slice(0, showItem).map((product, i) => (
                <div className=" col-6 col-lg-1-5 col-md-4 col-sm-6 mb-30" key={i}>
                    <SingleProduct product={product} />
                </div>
            ))}
        </>
    );
};

export default FeaturedTab;
