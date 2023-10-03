import BlogSingle from '../../components/elements/BlogSingle';
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router';
import { useQuery} from 'react-query'
function PageBlogSingle() {
    const Router = useRouter()
    const {id} =  Router.query 
    const fetchNew = async (id) =>{
        const request = await fetch(process.env.apiServer + `/api/news/${id}`,
        {
        credentials: "include"})

        const data = await request.json()
        /* setData(res)
        console.log(data) */
        //cratePagination(data)
        return data
        }
    const { isSuccess, data, isLoading, isError,refetch,isPreviousData } = useQuery({
        queryKey:["getNew",id],
        queryFn:() => fetchNew(id),
        keepPreviousData: true,
        staleTime: 5000,
        enabled:id!==undefined && Router.isReady,
        });
    return (
        <>
            <Layout parent="首頁" sub=" 活動資訊" /* subChild="Blog Details" */>
                <section className="mt-50 mb-50">
                    <div className="container custom">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <BlogSingle data={data}/>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default PageBlogSingle;
