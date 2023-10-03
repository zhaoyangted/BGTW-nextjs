import { useState, useEffect } from "react"
import SwiperCore, { Navigation, Thumbs } from "swiper"
import "swiper/css/thumbs"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Navigation, Thumbs])

const ThumbSlider = ({ img }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	/* const [img, setImg] = useState()
	useEffect(() => {
		const imgArray = () => {
			let imag = []
			for (
				let i = 1;
				i < 6;
				i++ 
			) {
				//console.log(product[`d_img${i}`])
				if(product[`d_img${i}`]!==""){imag.push(product[`d_img${i}`])}
			}
			setImg(imag)
		}
		return () => imgArray;
	}, [product]) */
	return (
		<div>
			<Swiper
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				className="mySwiper2"
			>
				{img?.map((item, i) => (
					<SwiperSlide key={i}>
						<img src={process.env.s3Host + item} />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={5}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				className="mySwiper"
			>
				{img?.map((item, i) => (
					<SwiperSlide key={i}>
						<img className="product-img-zoom"src={process.env.s3Host + item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default ThumbSlider