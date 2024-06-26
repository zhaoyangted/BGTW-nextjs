import CategoryTab from "../components/ecommerce/categoryTab"
import FeatchDeals from "../components/ecommerce/fetchDeals"
//import FeatchTab from "../components/ecommerce/fetchTab";
import FetchTabSlider from "../components/ecommerce/fetchTabSlider"
import Bottom from "../components/elements/Bottom"
import QuickView from "./../components/ecommerce/QuickView"
import Banner5 from "./../components/elements/Banner5"
//import Deals1 from "./../components/elements/Deals1";
//import IntroPopup from "./../components/elements/IntroPopup";
import Layout from "./../components/layout/Layout"
import CategorySlider from "./../components/sliders/Category"
import Intro1 from "./../components/sliders/Intro1"
//import Link from "next/link"
//import { useAuth } from "../util/useAuth"
//import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
//import useSWR from "swr"
//import useSWRMutation from 'swr/mutation'
import { useContext, useEffect } from "react"
import { AuthContext } from "../util/useAuthContext"
import CookieConsent from '../components/cookieconsent'
export default function Home() {
	//const { status, data: session } = useSession()
	const {user,setUser} = useContext(AuthContext)
	const fetcher = (url) => fetch(url, { credentials: "include", sameSite: "none" }).then((r) => r.json())
	const { data, isLoading, error,refetch } = useQuery({
	
		queryKey:["gethomepage",process.env.apiServer + "/api/homepage/"],
		queryFn:()=>fetcher(process.env.apiServer + "/api/homepage/"),
		//enabled:user?true:false,
		refetchOnWindowFocus:true
	})
	
	const { 
		data:newData, 
		isLoading:newLoading, 
		error:newError,
		//refetch:newFetch,
		
		//trigger:newTrigger
	} = useQuery({
		queryKey:["getnew",process.env.apiServer + "/api/product/newproducts"],
		queryFn:()=>fetcher(process.env.apiServer + "/api/product/newproducts"),
		//enabled:user?true:false,
		refetchOnWindowFocus:true
		})
	const { 
		data:hot, 
		isLoading:hotLoading, 
		error:hotError,
		//refetch:hotFetch
		//trigger:hotTrigger
	} = useQuery({
		queryKey:["gethot",process.env.apiServer + "/api/product/hot"],
		queryFn:()=>fetcher(process.env.apiServer + "/api/product/hot"),
		//enabled:user?true:false,
		refetchOnWindowFocus:true
	})
	/* useEffect(()=>{
		newFetch()
		refetch()
		hotFetch()
	},[]) */
	//console.log(hot)
	return (
		<>
			{/* <IntroPopup /> */}

			<Layout noBreadcrumb="d-none">
				<section className="home-slider position-relative mb-30">
					{/* <div className="container"> */}
					<div className="home-slide-cover">
						<Intro1 data={data?.BannerData} />
					</div>
					{/* </div> */}
				</section>

				<section className="popular-categories section-padding">
					<div className="container wow animate__fadeIn animate__animated">
						<div className="section-title">
							<div className="title">
								<h3>主要品牌</h3>
								{/* <ul className="list-inline nav nav-tabs links">
                                <li className="list-inline-item nav-item">
                                    <Link href="/products" className="nav-link">
                                        Cake & Milk
                                    </Link>
                                </li>
                                <li className="list-inline-item nav-item">
                                    <Link href="/products" className="nav-link">
                                        Coffes & Teas
                                    </Link>
                                </li>
                                <li className="list-inline-item nav-item">
                                    <Link href="/products" className="nav-link active">
                                        Pet Foods
                                    </Link>
                                </li>
                                <li className="list-inline-item nav-item">
                                    <Link href="/products" className="nav-link">
                                        Vegetables
                                    </Link>
                                </li>
                            </ul> */}
							</div>
						</div>
						<div className="carausel-10-columns-cover position-relative">
							<div className="carausel-10-columns" id="carausel-10-columns">
								<CategorySlider />
							</div>
						</div>
					</div>
				</section>

				<section className="banners mb-25">
					<div className="container">
						
						<div className="row">
							<Banner5 data={data?.ActionData} />
						</div>
					</div>
				</section>

				{hot&&
				<section className="product-tabs section-padding position-relative">
					<div className="container">
					{/* <div className="row"> */}
						<CategoryTab  data={hot}/>
					{/* 	</div> */}
					</div>
				</section>
				}

				{!newError&&<FetchTabSlider data={newData}/>}
				
				{!newError&&<FeatchDeals data={newData}/>}

				{hot&&<Bottom data={hot}/>}

				<QuickView />
				<CookieConsent />
			</Layout>
		</>
	)
}
