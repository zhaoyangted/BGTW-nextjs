import SwiperCore, { Autoplay,Navigation, Pagination } from "swiper"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
//import useSWR from "swr"
import Link from "next/link"
import 'swiper/css';
SwiperCore.use([Autoplay,Navigation, Pagination])

const Intro1 = ({data}) => {
	/* const fetcher = url => fetch(url,{credentials:'include'}).then(r => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer+"/api/homepage/",fetcher) */

	
	return (
		<>
			<Swiper
				/* slidesPerView={1.5} */
				autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
				spaceBetween={0}
				centeredSlides={true}
				//autoHeight={true}
				//autoplay={true}
				loop={true}
				pagination={{
					clickable: true,
				}}
				navigation={{
					prevEl: ".custom_prev_i1",
					nextEl: ".custom_next_i1",
				}}
				breakpoints={{
					500: {
						slidesPerView: 1,
					},
					640: {
						slidesPerView: 1.3,
					},
					992: {
						slidesPerView: 1.5,
					},
					1200: {
						slidesPerView: 1.95,
					},
					1600:{
						slidesPerView: 2.1,
					},
					1800: {
						slidesPerView: 2.3,
					},
					 2000: {
						slidesPerView: 2.5,
					},
					2500:{
						slidePerView:2.8,
					},/*
					3000:{
						slidePerView:3.2,
					},
					4000:{
						slidePerView:3.4
					} */
				}}
				// modules={[Autoplay,Pagination, Navigation]}
				className="hero-slider-1 style-3 dot-style-1 dot-style-1-position-1"
			>
				{
					data?.map((url, i) => (
						//console.log(url.d_img)
						<SwiperSlide key={i}>
							<div
								className="single-hero-slider single-animation-wrap .slider-1-height-3"
								/* style={{
									background:`url(${url.d_img})`
								}} */
							>
								<Link href={`${url.d_link}`}>
									 <img className="img-hover-slide" src={process.env.s3Host+url.d_img} />
								{/*	 <img src="assets/imgs/slider/slider-1.png" /> */}
								</Link>
							</div>
						</SwiperSlide>
					))
				}
			</Swiper>

			<div className="slider-arrow hero-slider-1-arrow">
				<span className="slider-btn slider-prev slick-arrow custom_prev_i1">
					<i className="fi-rs-angle-left"></i>
				</span>
				<span className="slider-btn slider-next slick-arrow custom_next_i1">
					<i className="fi-rs-angle-right"></i>
				</span>
			</div>
		</>
	)
}

export default Intro1
