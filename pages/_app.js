import { useEffect, useState } from "react"
import { SWRConfig } from "swr"
import fetchJson from "../lib/fetchJson"
// import "react-input-range/lib/css/index.css";
import "react-perfect-scrollbar/dist/css/styles.css"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import "react-responsive-modal/styles.css"
// import WOW from 'wowjs';
// Swiper Slider
import "swiper/css"
import "swiper/css/navigation"
import StorageWrapper from "../components/ecommerce/storage-wrapper"
import "../public/assets/css/main.css"
import store from "../redux/store"
import Preloader from "./../components/elements/Preloader"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [loading, setLoading] = useState(false)
	config.autoAddCss = false
	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)

		// new WOW.WOW({
		//     live: false
		//   }).init()
	}, [])
	return (
		<>
			<SWRConfig
				value={{
					//fetcher: fetchJson,
					onError: (err) => {
						console.error(err)
					},
				}}
			>
				<SessionProvider session={session}>
					<Provider store={store}>
						<StorageWrapper>
							
                            <Component {...pageProps} /> 
                            
							<ToastContainer />
						</StorageWrapper>
					</Provider>
				</SessionProvider>
			</SWRConfig>
		</>
	)
}

export default MyApp
