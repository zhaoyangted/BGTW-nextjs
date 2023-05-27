
import Link from "next/link";
import styles from '../../components/breadcrumb.module.css'
const Breadcrumb = ({parent, sub, subChild ,noBreadcrumb}) => {
    return <>
        
        <div className="container">
            <div className={`page-header ${noBreadcrumb}`}>
                <div className={styles.breadcrumb}>
                    <li><Link href="/">
                        {parent}

                    </Link></li>
                    {sub&&<> <span></span> {sub}
                     </>}{/* <span></span>{subChild} */}
                    {subChild&&<div className={styles.breadcrumblink} 
                    dangerouslySetInnerHTML={{__html:subChild}}>

                    </div>}
                </div>
            </div>
        </div>
    </>;
};

export default Breadcrumb;
