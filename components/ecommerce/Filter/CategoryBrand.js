import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import Link from "next/link";
//import useClickOutside from "../../../util/outsideClick";
import styles from '../../catmenu.module.css'
const CategoryBrand = (
    { 
        updateProductCategory,
        menusData,
         
    }) => {
    const router = useRouter();
    //console.log(menusData)
    const menusArray = menusData?Object.entries(menusData):null
    //console.log(menusArray)
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
		status: false,
		key:"",
	})
    const [isActive2, setIsActive2] = useState({
		status: false,
		key:"",
	})
	const handleToggle = (key) => {
		if (isActive2.key === key) {
			setIsActive({
				status: false,
			})
		} else {
			setIsActive2({
				status: true,
				key,
			})
		}
	}
    const handleToggle2 = (key) => {
		if (isActive2.key === key) {
			setIsActive2({
				status: false,
			})
		} else {
			setIsActive2({
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
    
    //console.log(isActive)
    return (
    menusData&&<>
        <ul className="mobile-menu-wrap" /* ref={domNode} */>
					{menusArray?.map((li, index) => {
						return (
							<li
								key={index}
								className={ styles.menuitemhaschildren + styles.menuitem}
							>
								<Link href="#">{li[0]}</Link>
								<span className="menu-expand" onClick={() => handleToggle(index)}>
                                <i className="fi-rs-angle-small-down"></i>
								</span>
								{li[1].length>=0&&
                                <ul className={isActive.key == index ? "dropdown "+styles.menuitem : "d-none "+styles.menuitem}>
									{li[1]?.map((ul, index) => {
										return (
											<ul className={isActive2.key == index ? "menu-item-has-children dropdown "+styles.menuitem : "menu-item-has-childrend-none "+styles.menuitem} key={index} >
												<Link href={"/products/products_list/"+ul.d_id+"/"}>{ul.d_title}</Link>
                                                <span className="menu-expand" onClick={() => handleToggle2(index)}>
                                                {ul.Subdata?.length>0&&<i className="fi-rs-angle-small-right"></i>}
                                                </span>
                                                {ul.Subdata?.map((li,i)=>{
                                                    return (
                                                        <li key={i} className={styles.li}>
                                                            <Link href={"/products/products_list/"+li.d_id+"/"}>{li.d_title}</Link>
                                                            
                                                        </li>
                                                    )
                                                })
                                                }
											</ul>
										)
									})}
								</ul>}
							</li>
						)
					})}
				</ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryBrand);
