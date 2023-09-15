import BlogGrid from "../../components/elements/BlogGrid"
//import BlogGridBig from "../../components/elements/BlogGridBig";
import BlogSidebar from "../../components/elements/BlogSidebar"
import Layout from "../../components/layout/Layout"
//import BlogFilter from '../../components/elements/BlogFilter';
import Pagination from "../../components/ecommerce/Pagination"
import { QueryClient, useQuery, useQueryClient } from "react-query"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
function PageBlogGrid() {
	//const queryClient = new QueryClient()
	let Router = useRouter()
	let showLimit = 12,
		showPagination = 4
	let [pagination, setPagination] = useState([])
	let [limit, setLimit] = useState(showLimit)
	let [currentPage, setCurrentPage] = useState(1)
	let { id } = Router.query
	//console.log(id)
	//let [data,setData]= useState({})
	if (id===undefined) {id=0}
	const fetchNews = async (id, page = 0) => {
		const request = await fetch(process.env.apiServer + `/api/news/catlist/${id}?page=${page - 1}&limit=${limit}`, {
			credentials: "include",
		})

		const data = await request.json()
		/* setData(res)
        console.log(data) */
		//cratePagination(data)
		return data
	}
	const { isSuccess, data, isLoading, isError, refetch, isPreviousData } = useQuery({
		queryKey: ["getNews", id, currentPage],
		queryFn: () => fetchNews(id, currentPage),
		//keepPreviousData: true,
		//staleTime: 5000,
		enabled: true,
	})
	const [pages, setPages] = useState()
	/* useEffect(async()=>{
          //await fetchNews();
          if (!isPreviousData && data?.hasMore) {
            queryClient.prefetchQuery({
              queryKey: ['projects', currentPage + 1],
              queryFn: () => fetchProjects(currentPage + 1),
            })
          }
        },[currentPage,data,isPreviousData,queryClient]) */
	//const cratePagination = (dat) => {
	// set pagination
	//console.log(data.pages)
	useEffect(() => {
		let arr = new Array(data?.NewsData?.PageList.TotalPage).fill().map((_, idx) => idx + 1)

		setPagination(arr)
		setPages(data?.NewsData?.PageList.TotalPage)
	}, [data, id])
	//};

	const startIndex = currentPage * limit - limit
	const endIndex = startIndex + limit
	const getPaginateddata = data?.NewsData?.dbdata

	let start = Math.floor((currentPage - 1) / showPagination) * showPagination
	let end = start + showPagination
	const getPaginationGroup = pagination.slice(start, end)

	const next = () => {
		setCurrentPage((page) => page + 1)
	}

	const prev = () => {
		setCurrentPage((page) => page - 1)
	}

	const handleActive = (item) => {
		setCurrentPage(item)
	}

	/* const selectChange = (e) => {
		setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(data?.NewsData.PageList.TotalRecord / Number(e.target.value)));
    }; */

	//console.log(data?.NewsData)
	return (
		<>
			{data ? (
				<Layout parent="首頁" sub=" > 最新消息" /* subChild="Grid" */>
					<section className="mt-50 mb-50">
						<div className="container custom">
							<div className="row">
								<div className="col-lg-3 primary-sidebar sticky-sidebar">
									{isSuccess && <BlogSidebar data={data?.News_type} />}
								</div>
								<div className="col-lg-9">
									<div className="shop-product-fillter mb-50 pr-30">{/* <BlogFilter/> */}</div>
									<div className="loop-grid pr-30">
										<div className="row">
											{isSuccess && <BlogGrid show={12} data={data?.NewsData?.dbdata} cat={data?.TID} />}
										</div>
									</div>
									<div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
										<nav aria-label="Page navigation example">
											{isSuccess && (
												<Pagination
													getPaginationGroup={getPaginationGroup}
													currentPage={currentPage}
													pages={pages}
													next={next}
													prev={prev}
													handleActive={handleActive}
												/>
											)}
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
				</Layout>
			) : null}
		</>
	)
}

export default PageBlogGrid
