import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import Link from "next/link";
import useClickOutside from "../../../util/outsideClick";
import styles from '../../catmenu.module.css'
const CategoryProduct = (
    { 
        updateProductCategory,
        menuDatas,
        menus 
    }) => {
    //console.log(Object.entries(menuDatas))
    const router = useRouter();
    const menusArray = menus? Object.values(menus) :null /* Object.entries(menuDatas) */
    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products/products_list/",
            query: {
                cat: category, //
            },
        });
    };
    const [isActive, setIsActive] = useState({
		status: true,
		key:"",
	})
	const handleToggle = (key) => {
		if (isActive.key === key) {
			setIsActive({
				status: false,
			})
		} else {
			setIsActive({
				status: true,
				key,
			})
		}
	}

	/* let domNode = useClickOutside(() => {
		setIsActive({
			status: false,
		})
	}) */
    useEffect(()=>{
        menusArray?.map((li, index) => {
            //console.log(li.d_id,menuDatas.d_id)
            if (li.d_id===menuDatas.d_id)
            {
             setIsActive({status:true,key:index});
            //console.log(index);
            }
         })

    },[menus])
    //console.log(isActive)
    return (
        <>
        <ul className="mobile-menu-wrap" /* ref={domNode} */>
                <li onClick={(e) => selectCategory(e, "")}>
                    {/* <a>{menuDatas.d_title}</a> */}
                </li>
					{menusArray?.map((li, index) => {
						return (
							<li
								key={index}
								className={li.d_id===menuDatas.d_id?  "menu-item-has-children active "+styles.menuitem: "menu-item-has-children "+styles.menuitem }
							>
								<Link href={"/products/products_list/"+ li.d_id}>{li.d_title}</Link>
								<span className="menu-expand" onClick={() => handleToggle(index)}>
                                {li.Subdata?.length>0&&<i className="fi-rs-angle-small-down"></i>}
								</span>
								{li?.Subdata&&
                                <ul className={isActive.key == index ? "dropdown" : "d-none"}>
									{li.Subdata.map((ul, index) => {
										return (
											<li key={index} className={styles.li}>
												<Link href={"/products/products_list/"+ul.d_id}>{ul.d_title}</Link>
												{/* <i className="fi-rs-angle-right"></i> */}
											</li>
										)
									})}
								</ul>}
							</li>
						)
					})}
				</ul>
           {/* <ul>
                <li onClick={(e) => selectCategory(e, "")}>
                    <a>{menuDatas.d_title}</a>
                </li>
                {
                    menusArray?.map((menu,i)=>{
                        return(
                        <li key={i} onClick={(e) => selectCategory(e, "jeans")}>
                            <Link href={"/products/products_list/"+ menu.d_id}>
                                <img
                                    src="/assets/imgs/theme/icons/category-1.svg"
                                    alt=""
                                />
                                {menu.d_title}
                            </Link>
                             <span className="count">30</span> 
                        </li>)
                    })
                }
                 <li onClick={(e) => selectCategory(e, "jeans")}>
                    <a>
                        <img
                            src="/assets/imgs/theme/icons/category-1.svg"
                            alt=""
                        />
                        Milks & Dairies
                    </a>
                    <span className="count">30</span>
                </li>
                <li onClick={(e) => selectCategory(e, "shoe")}>
                    <a>
                        <img
                            src="/assets/imgs/theme/icons/category-2.svg"
                            alt=""
                        />
                        Clothing
                    </a>
                    <span className="count">35</span>
                </li>
                <li onClick={(e) => selectCategory(e, "jacket")}>
                    <a>
                        <img
                            src="/assets/imgs/theme/icons/category-3.svg"
                            alt=""
                        />
                        Pet Foods{" "}
                    </a>
                    <span className="count">42</span>
                </li>                
            </ul>*/} 
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
