//import Link from "next/link"
import React,{useRef,useEffect} from "react"
//import {connect} from "react-redux"
//import styles from "../components/404.module.css"
import { useRouter } from "next/router"
/* import {
	clearCart,
} from "../redux/action/cart" */
const Pay=() =>

{
    const router = useRouter();
    const {
        query:{
            AuthRestURL,
            MerchantID,
            TerminalID,
            customize,
            gateway,
            lidm,
            merID,
            purchAmt
        }
    } =router
    const props ={
            AuthRestURL,
            MerchantID,
            TerminalID,
            customize,
            gateway,
            lidm,
            merID,
            purchAmt
    }
    //const userdata = router?.query.data;
    //console.log(userdata)
    const formRef = useRef(null);
  useEffect(() => {
    formRef.current.submit();
  }, []);
	return (
        <div> 
            <form ref={formRef} action={props.gateway} method="POST">
                <input type="hidden" name="AuthRestURL" value={props.AuthRestURL+''} />
                <input type="hidden" name="MerchantID"  value={props.MerchantID+''} />
                <input type="hidden" name="TerminalID" value={props.TerminalID+''} />
                <input type="hidden" name="customize" value={props.customize+''} />
                <input type="hidden" name="lidm" value={props.lidm+''} />
                <input type="hidden" name="merID" value={props.merID+''} />
                <input type="hidden" name="purchAmt" value={props.purchAmt+''} />
                {/* <button type="submit">
                    submit
                </button> */}

            </form>
        </div>
    )
}


/* const mapStateToProps = (state) => ({
	cartItems: state.cart,
	activeCart: state.counter,
})

const mapDispatchToProps = {
	clearCart,
} */

export default Pay