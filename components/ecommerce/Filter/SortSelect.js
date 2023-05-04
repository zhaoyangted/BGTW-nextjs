import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const SortSelect = ({ updateProductFilters }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const [featured, setFeatured] = useState("");
    const sortList = {
        "1": "依上架時間：新至舊",
        "2": "依上架時間：舊至新",
        "3": "依價格排序：低至高",
        "4": "依價格排序：高至低",
        "5": "瀏覽最多商品"
    }
    useEffect(() => {
        const filters = {
            featured,
        };
        
        updateProductFilters(filters);
    }, [searchTerm, featured]);
    
    const seleceOption = (e) => {
        setFeatured(e.target.value);
    };
    
    //console.log(sortList)
    return (
        <>
            <div className="sort-by-product-wrap">
                <div className="sort-by">
                    <span>
                        <i className="fi-rs-apps-sort"></i>
                        {/* Sort by: */}
                    </span>
                </div>
                <div className="sort-by-dropdown-wrap custom-select">
                    <select onChange={(e) => seleceOption(e)}>
                        {Object.keys(sortList).map((value,i)=>{
                            return(
                                <option value={value}key={i}>{Object.values(sortList)[i]}</option>
                            )
                        })

                        }
                        {/* <option value="">Defaults</option>
                        <option value="featured">Featured</option>
                        <option value="trending">Trending</option>
                        <option value="lowToHigh">Low To High</option>
                        <option value="highToLow">High To Low</option> */}
                    </select>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(SortSelect);
