import Layout from "../components/layout/Layout";
import styles from '../components/qa.module.css'
import useSWR from "swr"
function Clause() {
    const fetcher = (url) => fetch(url, { credentials: "include" }).then((r) => r.json())
	const { data, isLoading, error } = useSWR(process.env.apiServer + "/api/homepage/clause", fetcher)
    
    return (
        <>
            <Layout parent="首頁" sub=" > 隱私條款" /* subChild="Guide" */>
            <div className="page-content pt-50">
                <div className="container">
                    <div className="row ml-100 mr-100">
                    <section className={styles.content_box}>
            <div className={styles.title01}>隱私權條款</div>
            <div className="user_editor"
                dangerouslySetInnerHTML={{__html:data?.ClauseData}}
            >
            </div>
          </section>
                    </div>
                </div>
            </div>
            </Layout>
        </>
    );
}

export default Clause;
