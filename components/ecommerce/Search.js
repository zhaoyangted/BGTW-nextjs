import { useRouter } from "next/router"
import React, { useState } from "react"
import styles from "../../components/header.module.css"
const Search = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("")
	const [catValue, setCatValue] = useState("")
	const router = useRouter()

	const handleSearch = (e) => {
		//console.log(searchTerm,catValue);
		router.push({
			pathname: "/products/search",
			query: {
				Pkeyword: searchTerm,
				Ptype: catValue,
			},
		})
		//setSearchTerm("")
		//setCatValue("")
	}

	const handleInput = (e) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleSearch()
		}
	}
	//console.log(searchTerm,catValue)
	return (
		<>
			<form >
				<select
					className="select-active"
					onChange={(e) => {
						setCatValue(e.target.value)
					}}
				>
					<option value="">選擇分類</option>
					{data
						? Object.entries(data).map((op, index) => {
								//console.log(op)
								return (
									<option key={index} value={op[0].split("_")[1]}>
										{op[0].split("_")[0]}
									</option>
								)
						  })
						: null}
				</select>
				<input
					value={searchTerm}
					onKeyDown={handleInput}
					onChange={(e) => setSearchTerm(e.target.value)}
					type="text"
					placeholder="商品名"
				/>
				<button className={styles.btnsearch} type="button"onClick={(e)=>{e.preventDefault;handleSearch()}}>
					<i className="fi-rs-search"></i>
				</button>
			</form>
		</>
	)
}

export default Search
