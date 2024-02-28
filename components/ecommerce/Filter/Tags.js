import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { updateProductFilters } from "../../../redux/action/productFiltersAction"

const Tags = ({ updateProductFilters }) => {
	const router = useRouter()
	const tags = [
		/* { value: "" }, */
		{ value: "1", title: "red" },
		{ value: "2", title: "blue" },
		{ value: "3", title: "green" },
		{ value: "4", title: "yellow" },
		{ value: "5", title: "brown" },
		{ value: "6", title: "purple" },
		{ value: "7", title: "white" },
		{ value: "8", title: "beige" },
		{ value: "9", title: "pink" },
	]
	const [selectedTags, setTags] = useState([])
	const [active, setActive] = useState(0)
	useEffect(() => {
		const filters = {
			tags: selectedTags, //
		}

		updateProductFilters(filters)
	}, [selectedTags])

	const handleClick = (i, target) => {
		setTags(target)
		setActive(active == i ? 0 : i)
	}
	return (
		<>
			<div className="tags-header">
				<h4>顏色屬性</h4>

				<ul className="tags-list">
					<li className="hover-up" onClick={() => handleClick(0, "")}>
						<a className={"cat-item text-brand-2"}>
							<i className="fi-rs-cross mr-10"></i>
							All
						</a>
					</li>
				</ul>
			</div>
			<ul className="tags-list">
				{tags.map((tag, i) => (
					<li className="hover-up" onClick={() => handleClick(i, tag.value)} key={i}>
						<a
							className={active == i ? "cat-item text-brand-2" : "cat-item text-brand"}
							style={{
								backgroundImage: `url(/assets/imgs/colors/${tag.value}.webp)`,
							}}
						>
							<i className="fi-rs-cross mr-10"></i>
							{/*i == 0 ? "All" : null  `${tag.title}` */}
						</a>
					</li>
				))}
			</ul>
		</>
	)
}

const mapDidpatchToProps = {
	updateProductFilters,
}

export default connect(null, mapDidpatchToProps)(Tags)
