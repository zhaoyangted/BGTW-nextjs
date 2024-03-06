import { useEffect, useState } from "react"
//import { SWRConfig } from "swr"
//import fetchJson from "../lib/fetchJson"
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
//import Preloader from "./../components/elements/Preloader"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config, library } from "@fortawesome/fontawesome-svg-core"
//import { SessionProvider } from "next-auth/react"
import { AuthContext, AuthProvider } from "../util/useAuthContext"
import "../pages/global.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [loading, setLoading] = useState(false)
	const [queryClient] = useState(() => new QueryClient())
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
			<AuthProvider>
				<Provider store={store}>
					<StorageWrapper>
						<QueryClientProvider client={queryClient}>
							<Component {...pageProps} />
							{/* <ReactQueryDevtools initialIsOpen={false} /> */}
						</QueryClientProvider>
						<ToastContainer />
					</StorageWrapper>
				</Provider>
			</AuthProvider>
		</>
	)
}

export default MyApp
