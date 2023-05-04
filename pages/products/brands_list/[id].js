import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Breadcrumb2 from "../../../components/layout/Breadcrumb2";
//import CategoryProduct from "../../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../../../components/ecommerce/Filter/PriceRangeSlider";
import ShowSelect from "../../../components/ecommerce/Filter/ShowSelect";
import SizeFilter from "../../../components/ecommerce/Filter/SizeFilter";
import SortSelect from "../../../components/ecommerce/Filter/SortSelect";
import VendorFilter from "../../../components/ecommerce/Filter/VendorFilter";
import Pagination from "../../../components/ecommerce/Pagination";
import QuickView from "../../../components/ecommerce/QuickView";
import WishlistModal from "../../../components/ecommerce/WishlistModal";
import Layout from "../../../components/layout/Layout";
import { fetchProduct } from "../../../redux/action/product";
import SingleProduct from "../../../components/ecommerce/SingleProduct";
import CategoryBrand from "../../../components/ecommerce/Filter/CategoryBrand";
const ProductsList = ({ 
    products, 
    productFilters, 
    fetchProduct,
}) => {
	let Router = useRouter(),
	searchTerm = Router.query.search,
	showLimit = 12,
	showPagination = 4;
	
    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.pages?.TotalRecord / limit));
    let [currentPage, setCurrentPage] = useState(1);
	const { id } = Router.query;
    useEffect(() => {
		if (!Router.isReady) {
			return;
		}
        fetchProduct(searchTerm, /* "/static/product.json" */process.env.apiServer+`/api/product/blist/${id}?page=${currentPage-1}&limit=${limit}&order=${productFilters.featured}`, productFilters);
        cratePagination();
    }, [productFilters, limit, currentPage,pages,/*  products.items,*/id]);
	
    const cratePagination = () => {
		// set pagination
        //console.log(products.pages)
        let arr = new Array(products.pages?.TotalPage/* Math.ceil(products?.pages?.TotalRecord / limit) */)
		.fill()
		.map((_, idx) => idx + 1);
		
        setPagination(arr);
        setPages(products.pages?.TotalPage/* Math.ceil(products.pages?.TotalRecord / limit) */);
    };
	//console.log(Object.entries(products.menus))
    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = products.items/* .slice(startIndex, endIndex) */;
	
    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);
	
    const next = () => {
		setCurrentPage((page) => page + 1);
    };
	
    const prev = () => {
		setCurrentPage((page) => page - 1);
    };
	
    const handleActive = (item) => {
		setCurrentPage(item);
    };
	
    const selectChange = (e) => {
		setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(products?.pages.TotalRecord / Number(e.target.value)));
    };
	//console.log(products.menus);
    return (
		<>
            <Layout noBreadcrumb="d-none">
            <Breadcrumb2 types={products.brands}/>
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row flex-row">
                            <div className="col-lg-3 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget  mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        品牌馆
                                    </h5>
                                    <CategoryBrand menusData={products.menus}/>
                                </div>

                                <div className="sidebar-widget price_range range mb-30">
                                <h5 className="section-title style-1 mb-30">Fill by price</h5>

                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <br />
                                            <PriceRangeSlider />

                                            <br />
                                        </div>
                                    </div>

                                    <div className="list-group">
                                        <div className="list-group-item mb-10 mt-10">
                                            <label className="fw-900">
                                                Color
                                            </label>
                                            <VendorFilter />
                                            <label className="fw-900 mt-15">
                                                Item Condition
                                            </label>
                                            <SizeFilter />
                                        </div>
                                    </div>
                                    <br />
                                </div>

                                <div className="sidebar-widget product-sidebar  mb-30 p-30 bg-grey border-radius-10">
                                <h5 className="section-title style-1 mb-30">New products</h5>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-3.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h5>
                                                <a>Chen Cardigan</a>
                                            </h5>
                                            <p className="price mb-0 mt-5">
                                                $99.50
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{ width: "90%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-4.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h6>
                                                <a>Chen Sweater</a>
                                            </h6>
                                            <p className="price mb-0 mt-5">
                                                $89.50
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{ width: "80%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-5.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h6>
                                                <a>Colorful Jacket</a>
                                            </h6>
                                            <p className="price mb-0 mt-5">
                                                $25
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{ width: "60%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                                    <img
                                        src="/assets/imgs/banner/banner-11.png"
                                        alt=""
                                    />
                                    <div className="banner-text">
                                        <span>Oganic</span>
                                        <h4>
                                            Save 17% <br />
                                            on{" "}
                                            <span className="text-brand">
                                                Oganic
                                            </span>
                                            <br />
                                            Juice
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 ">
							<div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            
                                            找到
                                            <strong className="text-brand">
                                                {products.pages?.TotalRecord}
                                            </strong>
                                            個產品!
                                        </p>
                                    </div>
                                    <div className="sort-by-product-area">
                                        <div className="sort-by-cover mr-10">
                                            <ShowSelect
                                                selectChange={selectChange}
                                                showLimit={showLimit}
                                            />
                                        </div>
                                        <div className="sort-by-cover">
                                            <SortSelect /* sortList={products.sorts}*/ />
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-grid-3">
                                    {getPaginatedProducts.length === 0 && (
                                        <h3>No Products Found </h3>
                                    )}

                                    {getPaginatedProducts.map((item, i) => (
                                        <div
                                            className="col-lg-3 col-md-4 col-12 col-sm-6 mb-30"
                                            key={i}
                                        >
                                            <SingleProduct product={item} />
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
                                        <Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
                                        />
                                    </nav>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </section>
                <WishlistModal />
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                <QuickView />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <Search />
                        </div>
                        <div className="col-xl-6">
                            <SideBarIcons />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-6">
                            <CategoryProduct />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3">
                            
                        </div>
                        <div className="col-md-9">
                            

                            

                            
                        </div>
                    </div>
                </div> */}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
	sortData: state.sorts,
	typeData: state.types,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProduct,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(ProductsList);
