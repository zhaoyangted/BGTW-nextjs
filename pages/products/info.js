import React, { useState } from "react"
import { useRouter } from "next/router"
import ProductDetails from "../../components/ecommerce/ProductDetails"
import Layout from "../../components/layout/Layout"
import { useQuery,useMutation, useQueryClient } from "react-query"
// import { server } from "../../config/index"
// import { findProductIndex } from "../../util/util"
const ProductId = () => {
	/*({ data,imag product, img,menuTitle,specData,watchedData } ) */
	let Router = useRouter()
	const { id } = Router.query
	const [product,setProduct]=useState({})
	//let specID = id
	//const [specID,setSpecID] = React.useState()
	//const [imag,setImag] = React.useState()
	//console.log(id)
	const queryClient = useQueryClient()
	const fetchProduct = async (id) => {
		/* if (!Router.isReady) {
			return;
		} */
		//console.log(id)
		const request = await fetch(process.env.apiServer + `/api/product/${id}`, {
			credentials: "include",
		})

		const data = await request.json()

		let imag = []
		for (let i = 1; i < 6; i++) {
			if (data.dbdata[`d_img${i}`] !== "") {
				imag.push(data.dbdata[`d_img${i}`])
			}
		}
		//return { data, imag }
		setProduct({data,imag})
	}
	const {
		//isSuccess,
		data,
		isLoading,
		isError,
		refetch,
	} = useQuery(["getProduct", id], () => fetchProduct(id), {
		enabled: Boolean(id !== undefined && Router.isReady),
	})
	const updateIdMutation = useMutation((specID) =>
    fetchProduct(specID),
	{
		/* onSettled: () => {
		  // flag the query with key ["issues"] as invalidated
		  // this causes a refetch of the issues data
		  queryClient.invalidateQueries(["getProduct"]);
		}, */
		onSuccess: async (data) => {
			//alert("id updated successfully: " + JSON.stringify(data));
		},
	}
  );
	const handleSpecChange = (specId) => {
		//console.log(specId)
		if (specId) {
		updateIdMutation.mutate(specId)
		}
	}
	//console.log(product)
	return (
		<>
			{product? (
				<Layout parent="主頁" /* sub="Shop" */ subChild={product?.data?.Menutitle}>
					<div className="container">
						<ProductDetails
							product={product?.data?.dbdata}
							img={product?.imag}
							specData={product?.data?.SpecData}
							watchedData={product?.data?.TodayWatchData}
							spec={handleSpecChange}
						/>
					</div>
				</Layout>
			 ) : null}
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
