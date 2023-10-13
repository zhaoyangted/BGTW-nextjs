import Link from "next/link"
import styles from "../../components/breadcrumb.module.css"
const Breadcrumb = ({ parent, sub, subChild, noBreadcrumb }) => {
	//const breadCrumb = subChild?subChild.split("#"):['']
	//console.log(subChild)
	const BreadC = () => {
		return (
			<>
				<li>
					<Link href="/">{parent}</Link>
				</li>
				{sub && (
					<>
						{" "}
						<span></span> {sub}
					</>
				)}
				{subChild?.map((l, i) => {
					//console.log(l.split("#")[1])
					if (i === 0) {
						return(<li key={i}>
						<Link href={{pathname:"/products/toplist",query:{id:l.split("#")[0]}}} rel="nofollow" 
						//as={`/products/top_list/${l.d_id}`}
						><span></span>{l.split("#")[1]}</Link>
						</li>)
					} else if (i === 1) {
						return(<li key={i}>
						<Link href={{pathname:"/products/plist",query:{ id:l.split("#")[0]}}}rel="nofollow" 
						//as={`/products/products_list/${l.d_id}`}
						><span></span>{l.split("#")[1]}</Link>
						</li>)
					} else {
						return(<li key={i}>
							<Link href={{pathname:"/products/plist",query:{ id:l.split("#")[0]}}}rel="nofollow"
							//as={`/products/products_list/${l.d_id}`}
							><span></span>{l.split("#")[1]}</Link>
						</li>)
					}
				})}
			</>
		)
	}
	return (
		<>
			{!noBreadcrumb&&<div className="container">
				<div className={`page-header ${noBreadcrumb}`}>
					<div className="breadcrumb">
						{/* <li>
							<Link href="/">{parent}</Link>
						</li>
						{sub && (
							<>
								{" "}
								<span></span> {sub}
							</>
						)}
						{subChild?.length > 0 && */}{" "}
						<BreadC />
					</div>
				</div>
			</div>}
		</>
	)
}

export default Breadcrumb
