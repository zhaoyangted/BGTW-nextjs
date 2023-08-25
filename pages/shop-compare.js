import React from "react";
import { connect } from "react-redux";
import CompareTable from "../components/ecommerce/CompareTable";
import Layout from "../components/layout/Layout";
import { clearCompare, deleteFromCompare } from "../redux/action/compareAction";

const Compare = ({ compare, clearCompare, deleteFromCompare }) => {
    return (
        <>
            <Layout parent="首頁" /* sub="Shop" */ subChild=" > 產品比價">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <h1 className="heading-2 mb-10">
                                    產品比較
                                </h1>
                                <h6 className="text-body mb-40">
                                    共有 <span className="text-brand">{compare.items.length}</span>
                                    產品進行比較
                                </h6>
                                <div className="table-responsive">
                                    {compare.items.length > 0 ? (
                                        <>
                                            <CompareTable
                                                data={compare.items}
                                                features={[
                                                    "產品預覽",
                                                    "產品名稱",
                                                    "產品價格",
                                                    /* "rating", */
                                                    /* "產品描述", */
                                                    /* "產品顏色", */
                                                    // "sizes",
                                                    "產品編號",
                                                    "產品庫存",
                                                    "產品紅利",
                                                    "產品購買"
                                                    /* "weight",
                                                    "dimensions",
                                                    "buy",
                                                    " ", */
                                                ]}
                                                deleteFromCompare={
                                                    deleteFromCompare
                                                }
                                            />
                                            <div className="text-right">
                                                <span
                                                    className="clear-btn"
                                                    onClick={clearCompare}
                                                >
                                                    清除
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <h4>沒有比較商品</h4>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    compare: state.compare,
});

const mapDispatchToProps = {
    clearCompare,
    deleteFromCompare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
