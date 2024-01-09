//import Link from "next/link"
import React from "react"
import {connect} from "react-redux"
import styles from "../components/404.module.css"
import { useRouter } from "next/router"
import {
	clearCart,
} from "../redux/action/cart"
const Pay=({
   /*  clearCart */
}) =>

{
    const router = useRouter();
    const userdata = router.query.data;
	return (
	<div className={styles.e404} style={{ marginTop: "5%",textAlign:"center" }}>
        <div dangerouslySetInnerHTML={{__html:userdata}} />
	</div>
    )
}


const mapStateToProps = (state) => ({
	cartItems: state.cart,
	activeCart: state.counter,
})

const mapDispatchToProps = {
	clearCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay)