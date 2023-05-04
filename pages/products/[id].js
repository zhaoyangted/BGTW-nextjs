import React from "react"
import { useRouter } from "next/router";
import ProductDetails from "../../components/ecommerce/ProductDetails"
import Layout from "../../components/layout/Layout"
import { useQuery } from "react-query";
// import { server } from "../../config/index"
// import { findProductIndex } from "../../util/util"
const ProductId = () =>{  /*({ data,imag product, img,menuTitle,specData,watchedData } ) */ 
	let Router = useRouter()
	const {id} = Router.query
	//const [data,setData] = React.useState()
	//const [imag,setImag] = React.useState()
	//console.log(id)
	const fetchProduct = async (id) =>{
		/* if (!Router.isReady) {
			return;
		} */
		//console.log(id)
		const request = await fetch(process.env.apiServer + `/api/product/${id}`,
		{
		credentials: "include"})

		const data = await request.json()

		let imag = []
		for (let i = 1; i < 6; i++) {
			if (data.dbdata[`d_img${i}`] !== "") {
				imag.push(data.dbdata[`d_img${i}`])
			}
		}
		return ({data,imag})
        }
	const { isSuccess, data: product, isLoading, isError,refetch } = useQuery(
			["getProduct", id],
			() => fetchProduct(id),
			{
			  enabled: id!==undefined && Router.isReady
			}
		  );
    
	return (
		<>
			{isSuccess||React.isReady?<Layout parent="主頁" sub="Shop" subChild={product.data.Menutitle}>
				<div className="container">
					<ProductDetails product={product.data.dbdata} img={product.imag} specData={product.data.SpecData} watchedData={product.data.TodayWatchData}/>
				</div>
			</Layout>:null}
		</>
	)
}

/* export async  function getServerSideProps (params,req,res) {
	const request = await fetch(process.env.apiServer + `/api/product/${params.query.slug}`,
	{
	credentials: "include"})

	const data = await request.json()

	let imag = []
	for (let i = 1; i < 6; i++) {
		if (data.dbdata[`d_img${i}`] !== "") {
			imag.push(data.dbdata[`d_img${i}`])
		}
	}
	console.log(data.SpecData)
	return { 
		props :{product:data.dbdata,
				img:imag,
				menuTitle:data.Menutitle,
				specData:data.SpecData,
				watchedData:data.TodayWatchData 
				}
	 }
}
 */
export default ProductId
