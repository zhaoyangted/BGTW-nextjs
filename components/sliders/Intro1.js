import SwiperCore, { Autoplay,Navigation, Pagination } from "swiper"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import useSWR from "swr"
import Link from "next/link"
SwiperCore.use([Autoplay,Navigation, Pagination])

const Intro1 = () => {
	const { data, isLoading, error } = useSWR(process.env.apiServer+"/api/homepage/")

	const Banner = () => {
		return data?.BannerData.map((url, i) => {
			//console.log(url.d_img)
			return (
			<SwiperSlide key={i}>
				<div
					className="single-hero-slider single-animation-wrap .slider-1-height-3"
					
				>
					<Link href={`${url.d_link}`}>
						 <img src={`${url.d_img}`} />
						{/* <img src="assets/imgs/slider/slider-1.png" /> */}
					</Link>
				</div>
			</SwiperSlide>
			)
		})
	}
	return (
		<>
			<Swiper
				/* slidesPerView={1.5} */
				spaceBetween={0}
				centeredSlides={true}
				autoplay={true}
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
						slidesPerView: 3.3,
					},
					1800: {
						slidesPerView: 4.3,
					},
					2000: {
						slidesPerView: 4.5,
					},
					2500:{
						slidePerView:5.1,
					},
					3000:{
						slidePerView:5.3,
					},
				}}
				// modules={[Autoplay,Pagination, Navigation]}
				className="hero-slider-1 style-3 dot-style-1 dot-style-1-position-1"
			>
				{
					data?.BannerData.map((url, i) => (
						//console.log(url.d_img)
						<SwiperSlide key={i}>
							<div
								className="single-hero-slider single-animation-wrap .slider-1-height-3"
								/* style={{
									background:`url(${url.d_img})`
								}} */
							>
								<Link href={`${url.d_link}`}>
									 <img className="img-hover-slide" src={`${url.d_img}`} />
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
