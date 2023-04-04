import React from "react"
import ProductDetails from "../../components/ecommerce/ProductDetails"
import Layout from "../../components/layout/Layout"
import { server } from "../../config/index"
import { findProductIndex } from "../../util/util"

const ProductId = ({ product, img,menuTitle }) => {
	return (
		<>
			<Layout parent="主頁" sub="Shop" subChild={menuTitle}>
				<div className="container">
					<ProductDetails product={product} img={img} />
				</div>
			</Layout>
		</>
	)
}

ProductId.getInitialProps = async (params) => {
	const request = await fetch(process.env.apiServer + `/api/product/${params.query.slug}`)

	const data = await request.json()

	let imag = []
	for (let i = 1; i < 6; i++) {
		if (data.dbdata[`d_img${i}`] !== "") {
			imag.push(data.dbdata[`d_img${i}`])
		}
	}

	return { product:data.dbdata, img: imag,menuTitle:data.Menutitle }
}

export default ProductId
