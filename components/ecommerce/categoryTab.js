import React, { useEffect, useState } from "react";
//import { server } from "../../config/index";
import Cat1Tab from '../elements/FeaturedTab';
/* import Cat2Tab from '../elements/NewArrivalTab';
import Cat3Tab from '../elements/TrendingTab';
import Link from "next/link" */
function CategoryTab() {
    const [active, setActive] = useState("1");
    const [catAll, setCatAll] = useState([]);
    const [cats, setCats] = useState([]);
    const [hotProd, setHotProd] = useState([]);
    const [cat3, setCat3] = useState([]);
    //console.log(data)
    /* 
    setHotProd(Object.values(data)) */
    
    const catPAll = async () => {
        const request = await fetch(process.env.apiServer+`/api/product/hot/`,
        {credentials: 'include'});
        
        const allProducts = await request.json();
        setCats(Object.keys(allProducts))
        //console.log(hotProd)
        //const catAllItem = allProducts.filter((item) => item.category);
        setCatAll(Object.values(allProducts));
        setHotProd(Object.values(allProducts)[0])
        setActive("1");
    };
    /* const catP1 = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const cat1Item = allProducts.filter((item) => item.category == "jeans");
        setCat1(cat1Item);
        setActive("2");
    };

    const catP2 = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const cat2Item = allProducts.filter((item) => item.category == "shoe");
        setCat2(cat2Item);
        setActive("3");
    };
    const catP3 = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const cat3Item = allProducts.filter((item) => item.category == "jacket");
        setCat3(cat3Item);
        setActive("4");
    }; */

    useEffect(() => {
        catPAll();
    }, []);

    return (
        <>
            <div className="section-title wow animate__animated animate__fadeIn" data-wow-delay="0" style={{textAlign:"center"}}>
                <h3>人氣商品特賣</h3>
            </div>
            
                
                <ul className="nav nav-tabs links" id="myTab" role="tablist">
                    {cats?.map((item,i)=>{
                        return (
                            <li className="nav-item" key={i} role="presentation" >
                                <a
                                    aria-label={item}
                                    className={
                                        active === `${i+1}` ? "nav-link   active" : "nav-link "
                                    }
                                    //data-bs-toggle="modal"
                                    style={{whiteSpace:"nowrap",width:"70px",height:"30px",overflowX:"auto"}}
                                    onClick={()=>{setHotProd(catAll[`${i}`]);setActive(`${i+1}`)}}
                                >
                                    {item/*.slice(0,4) +"..." */}
                                </a>
                            </li>
                        )
                    })
                    }
                    {/* <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "1" ? "nav-link active" : "nav-link"
                            }
                            onClick={catPAll}
                        >
                            All
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "2" ? "nav-link active" : "nav-link"
                            }
                            onClick={catP1}
                        >
                            Featured
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "3" ? "nav-link active" : "nav-link"
                            }
                            onClick={catP2}
                        >
                            Popular
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "4" ? "nav-link active" : "nav-link"
                            }
                            onClick={catP3}
                        >
                            New added
                        </button>
                    </li> */}
                </ul>

            <div className="tab-content wow fadeIn animated">
                {
                    cats?.map((item,i)=>{
                        return(
                            <div
                                className={
                                    active === `${i+1}`
                                        ? "tab-pane fade show active"
                                        : "tab-pane fade"
                                }
                                key={i}
                            >
                    <div className="product-grid-4 row mb-30">
                        <Cat1Tab products={hotProd} />
                    </div>
                </div>
                        )
                    })
                }
                {/* <div
                    className={
                        active === "1"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat1Tab products={catAll} />
                    </div>
                </div>

                <div
                    className={
                        active === "2"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat1Tab products={cat1} />
                    </div>
                </div>

                <div
                    className={
                        active === "3"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat3Tab products={cat2} />
                    </div>
                </div>
                <div
                    className={
                        active === "4"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat2Tab products={cat3} />
                    </div>
                </div> */}
            </div>
        </>
    );
}
export default CategoryTab;
