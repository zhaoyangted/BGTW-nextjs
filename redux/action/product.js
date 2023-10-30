// import fetch from 'isomorphic-unfetch'
import filterProductList from "../../util/filterProduct"
import searchItemsByText from "../../util/searchItemsByText"
import * as Types from "../constants/actionTypes"
import axios from "axios"

// Fetch Product fetchProduct
export const fetchProduct = (searchTerm, url, filters, podata) => async (dispatch) => {
	let data
	try {
		//console.log(podata)
		let sendRequest = ""
		if (!podata) {
			sendRequest = await fetch(url, { credentials: "include" })
			data = await sendRequest.json()
		} else {
			sendRequest = await axios.post(url, podata, { credentials: "include" })
			data = sendRequest.data
		}
		//console.log(data.dbdata.dbdata)
		/* window.products = data.dbdata.dbdata
        window.sortData = data.OrderArray
        window.typeData = data.TypeData */
        if (sendRequest.status!==404) {
			
		const searchedItems = searchItemsByText(searchTerm, data.dbdata.dbdata)
		const filteredList = filterProductList(searchedItems, filters)
		
		dispatch({
			type: Types.FETCHED_PRODUCT,
			payload: {
				products: filteredList,
				sortData: data.OrderArray,
				typeData: data.TypeData,
				brandData: data.BrandData,
				menuData: data.Menudata,
				menu: data.Menu,
				page: data.dbdata.PageList,
			},
		})
		}else{
			dispatch({
				type: Types.FETCHED_PRODUCT,
				payload: {
					products: [],
					sortData: data.OrderArray,
					typeData: data.TypeData,
					brandData: data.BrandData,
					menuData: data.Menudata,
					menu: data.Menu,
					page: data.dbdata.PageList,
				},
			})
		}
	} catch (error) {
		console.log(error)
	}
}
export const fetchProductByID = (id) => async (dispatch) => {
	let data
	try {
		//console.log(podata)
		let sendRequest = ""
		if (!id) {
			sendRequest = await fetch(process.env.apiServer + `/api/product/${id}`, { credentials: "include" })
			data = await sendRequest.json()
		}
		
		dispatch({
			type: Types.FETCHED_PRODUCT_ID,
			payload: {
				product:data
			},
		})
	} catch (error) {
		console.log(error)
	}
}
// Fetch More Product
export const fetchMoreProduct = (url, total) => async (dispatch) => {
	try {
		const sendRequest = await fetch(url)
		const data = await sendRequest.json()

		// const searchedItems = searchItemsByText(searchTerm,data)
		// const filteredList  = filterProductList(searchedItems,filters)

		dispatch({
			type: Types.FETCHED_MORE_PRODUCT,
			payload: { products: data, total },
		})
	} catch (error) {
		console.log(error)
	}
}

// Fetch Product By Catagory

export const fetchByCatagory = async (url, filters) => {
	try {
		const sendRequest = await fetch(url)
		const data = await sendRequest.json()
		const filteredList = filterProductList(data, filters)

		return filteredList
	} catch (error) {
		console.log(error)
	}
}
