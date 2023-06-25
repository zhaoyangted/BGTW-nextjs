import {useState,useEffect} from "react";
import axios from "axios";

 const useFetchCart = (list) => {
     const [data, setData] = useState(null)
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState(false)
     //console.log(list)
     let str = ""
     list?.map((p,i)=>{
         p.d_id?
         str=str+p.d_id+'@#'+p.quantity+'@#;'
         :null;
        })
     useEffect(() => {
            const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.post(process.env.apiServer+"/api/cart/cart/",str,{withCredentials:'include'});
                setData(res.data);
            } catch (err) {
                setError(true);
            }
            setLoading(false);
            };
        fetchData();
     }, []);
    // console.log(data)
    return { data, loading, error };
  };
  
  export default useFetchCart;