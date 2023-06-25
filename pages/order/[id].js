import React from "react"
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import styles from "../../components/account.module.css"
import useSWR from "swr"
import { useRouter } from "next/router"
//import axios from "axios"
//import { METHODS } from "http"
const OrderInfo = () => {
	const { query } = useRouter()
    const activeTab = useActiveTab()
	const {id }= query
    function useActiveTab() {
        const activeTab = query.activeTab || "account"
		return activeTab
	}
    //console.log(id)
	const fetcher = (url) => fetch(url, { credentials: "include",method:'POST' }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + `/api/member/orders/info/${id}`, fetcher)
    
	return (
    <>
        <Layout parent="Home" /*sub="Account" */ subChild=" > 會員中心">
				<div className="page-content pt-50 pb-50">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-10 m-auto">
								<div className="row">
									<div className="col-md-3">
										<div className="dashboard-menu">
											<ul className="nav flex-column" role="tablist">
												<li className="nav-item">
													<Link
														href="/account/"
														className={!id ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(1)}
													>
														<i className="fi-rs-settings-sliders mr-10"></i>會員中心
													</Link>
												</li>
												<li className="nav-item">
													<Link
														href="/account/?activeTab=info"
														className={activeTab === 'info' ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(2)}
													>
														<i className="fi-rs-user mr-10"></i>會員資料
													</Link>
												</li>
												<li className="nav-item">
													<Link
                                                        href="/account/?activeTab=order"
														className={activeTab === 'order'|| id ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(3)}
													>
														<i className="fi-rs-shopping-cart-check mr-10"></i>購物紀錄
													</Link>
												</li>
												<li className="nav-item">
													<Link
                                                        href="/account/?activeTab=point"
														className={activeTab === 'point' ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(4)}
													>
														<i className="fi-rs-money mr-10"></i>會員點數
													</Link>
												</li>
												<li className="nav-item">
													<Link href="/account/?activeTab=favor"
														className={activeTab === 'favor' ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(5)}
													>
														<i className="fi-rs-heart mr-10"></i>我的收藏
													</Link>
												</li>
												<li className="nav-item">
													<Link href="/account/?activeTab=friend"
														className={activeTab === 'friend' ? "nav-link active" : "nav-link"}
														//onClick={() => handleOnClick(6)}
													>
														<i className="fi-rs-users mr-10"></i>推薦朋友
													</Link>
												</li>
												<li className="nav-item">
													<Link href="/page-login" className="nav-link">
														<i className="fi-rs-sign-out mr-10"></i>登出
													</Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="col-md-9">
										<div className="tab-content account dashboard-content pl-50">
											{/* <div className={activeTab === 'account' ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <Member />
                                            </div>
											<div className={activeTab === 'info' ? "tab-pane fade active show" : "tab-pane fade "}>
												<AccEdit />
											</div>
											<div className={activeTab === 'order' ? "tab-pane fade active show" : "tab-pane fade "}>
												<Orders />
											</div>
											<div className={activeTab === 'point' ? "tab-pane fade active show" : "tab-pane fade "}>
												<Point />
											</div>
											<div className={activeTab === 'favor' ? "tab-pane fade active show" : "tab-pane fade "}>
												<Favorites />
											</div>
											<div className={activeTab === 'friend' ? "tab-pane fade active show" : "tab-pane fade "}>
												<Friends />
											</div> */}
                                            <div className={ id ? "tab-pane fade active show" : "tab-pane fade "}>
												{/* <OrderInfo /> */}
                                                <div className="container">
                                                    <section className={styles.content_box03}>
                                                        {data?.Odata.d_orderstatus !== 10 ? (
                                                            data?.Odata.d_pay === 4 ? (
                                                                <div
                                                                    className={styles.w14}
                                                                    style={{fontSize: "18px",backgroundColor: "#ff3c6c",color: "#fff",fontWeight: "bolder"}}
                                                                >
                                                                    您的轉帳資料已寄送至收件人信箱，準備可上網之電腦，持任一家金融機構發行之晶片金融卡且已申請非約定轉帳服務功能就可繳款。
                                                                </div>
                                                            ) : data?.Odata.d_orderstatus === 11 ? (
                                                                <div
                                                                    className={styles.w14} style={{fontSize: "18px", backgroundColor: "#ff3c6c",color: "#fff",fontWeight: "bolder"}}
                                                                >
                                                                    您的訂單內含有特殊運費之商品，目前已完成運費報價，點選下方同意付款，即可完成該訂單。
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={styles.w14} style={{fontSize: "18px",backgroundColor:" #ff3c6c",color: "#fff",fontWeight: "bolder"}}
                                                                >
                                                                    您訂購的商品中包含特殊運費商品，因此訂單尚未建立完成。
                                                                    <br />
                                                                    待運費報價後，方可繼續進行付款作業。
                                                                </div>
                                                            )
                                                        ) : null}
                                                        <div
                                                            className={styles.w14} style={{fontSize: "18px",backgroundColor: "#ff3c6c",color: "#fff",fontWeight: "bolder"}}
                                                        >
                                                            {data?.Odata.d_orderstatus !== "10" ? "您的訂單資料已確認送出，" : ""}
                                                            我們將盡快處理，謝謝！如有任何問題或意見，請聯繫我們。
                                                        </div>
                                                        <div className={styles.order02}>
                                                            <ul>
                                                                <li>
                                                                    <div className="dbox">
                                                                        <dd>訂單編號</dd>
                                                                        <em>
                                                                            <a href={"/member/orders/" + data?.Odata.OID}>{data?.Odata.OID}</a>
                                                                        </em>
                                                                    </div>
                                                                    <div className="dbox">
                                                                        <dd>訂購日期</dd>
                                                                        {data?.Odata.d_create_time.substr(0, 10)}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="dbox">
                                                                        <dd>訂單金額</dd>
                                                                        <b>{parseInt(data?.Odata.d_total)||''}</b>
                                                                    </div>
                                                                    <div className="dbox">
                                                                        <dd>付款方式</dd>
                                                                        {data?.Cashflow.d_title ? data?.Cashflow.d_title : "付款方式已不存在"}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="dbox">
                                                                        <dd>訂單狀態</dd>
                                                                        {data?.Orders_status[data?.Odata?.d_orderstatus]}
                                                                    </div>
                                                                    <div className="dbox">
                                                                        <dd>付款狀態</dd>
                                                                        {data?.Pay_status[data?.Odata.d_paystatus]}
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className={styles.cart02} style={{marginTop:"30px"}}>
                                                            <div className={styles.titlebox}>
                                                                <div className={styles.name}>商品</div>
                                                                <div className={styles.number}>數量</div>
                                                                <div className={styles.price}>小計</div>
                                                            </div>
                                                            {data?.Detaildata?.map((d, i) => {
                                                                return (
                                                                    <ul key={i}>
                                                                        <div className={styles.namebox}>
                                                                            <div className={styles.name}>
                                                                                <dd>
                                                                                    <img src={"/" + d.d_img} />
                                                                                </dd>
                                                                                <dt>
                                                                                    <div className={styles.tt}>
                                                                                        {d.d_title +
                                                                                            (d.d_status == "3" || d.status === "4" ? (
                                                                                                <span style={{color:"red"}}>(退貨商品)</span>
                                                                                            ) : (
                                                                                                ""
                                                                                            ))}
                                                                                    </div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>商品編號</div>
                                                                                        <div className={styles.spec}>{d.d_model}</div>
                                                                                    </div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>單價</div>
                                                                                        <div className={styles.spec}>
                                                                                            <span>NT$+{parseInt(d.d_price)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {d.d_addtitle ? (
                                                                                        <div className={styles.sbox}>
                                                                                            <div className={styles.dtt}>商品加購</div>
                                                                                            <div className={styles.spec}>{d.d_addtitle + "+ NT$" + d.d_addprice}</div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>出貨日期</div>
                                                                                        <div className={styles.spec}>{d.d_ship_date !== "0000-00-00" ? d.d_ship_date : "無"}</div>
                                                                                    </div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>到貨日期</div>
                                                                                        <div className={styles.spec}>{d.d_arrival_date !== "0000-00-00" ? d.d_arrival_date : "無"}</div>
                                                                                    </div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>物流單號</div>
                                                                                        <div className={styles.spec}>{d.d_shipnumber !== "0000-00-00" ? d.d_shipnumber : "無"}</div>
                                                                                    </div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>物流商</div>
                                                                                        <div className={styles.spec}>
                                                                                            {data?.Shipdata_title[d.SHID] ? (
                                                                                                <a href={data?.Shipdata_link[d.SHID]} target="_blank">
                                                                                                    {" "}
                                                                                                    {data?.Shipdata_title[d.SHID]}
                                                                                                </a>
                                                                                            ) : (
                                                                                                "無"
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                </dt>
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.numberbox}>
                                                                            <div className={styles.number}>{d.d_num}</div>
                                                                            <div className={styles.price}>$NT+{parseInt(d.d_total)}</div>
                                                                        </div>
                                                                        {d.Stitle ? (
                                                                            <div className={styles.salesbox}>
                                                                                <div className={styles.slist}>
                                                                                    <div className={styles.icon}>
                                                                                        <span className={styles.icon_ok}>符合</span>
                                                                                    </div>
                                                                                    <div className={styles.sales}>
                                                                                        <a href="#">{d.Stitle}</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                    </ul>
                                                                )
                                                            })}
                                                            {data?.Adddata?.map((a, i) => {
                                                                return (
                                                                    <ul key={i}>
                                                                        <div className={styles.namebox}>
                                                                            <div className={styles.name}>
                                                                                <dd>
                                                                                    <img src={a.d_img} />
                                                                                </dd>
                                                                                <dt>
                                                                                    <div className={styles.tt}>{a.d_title}</div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>單價</div>
                                                                                        <div className={styles.spec}>
                                                                                            <span>NT$+{parseInt(a.d_price)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </dt>
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.numberbox}>
                                                                            <div className={styles.number}>1</div>
                                                                            <div className={styles.price}>
                                                                                $NT+
                                                                                {a.d_price}
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.salesbox}>
                                                                            <div className={styles.slist}>
                                                                                <div className={styles.slist}>加價購</div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                )
                                                            })}
                                                            {data?.Trialdata?.map((t, i) => {
                                                                return (
                                                                    <ul key={i}>
                                                                        <div className={styles.namebox}>
                                                                            <div className={styles.name}>
                                                                                <dd>
                                                                                    <img src={"/" + t.d_img} />
                                                                                </dd>
                                                                                <dt>
                                                                                    <div className={styles.tt}>{t.d_title}</div>
                                                                                    <div className={styles.sbox}>
                                                                                        <div className={styles.dtt}>商品編號</div>
                                                                                        <div className={styles.spec}>{t.d_model}</div>
                                                                                    </div>
                                                                                </dt>
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.numberbox}>
                                                                            <div className={styles.number}>1</div>
                                                                            <div className={styles.price}>---</div>
                                                                        </div>
                                                                        <div className={styles.salesbox}>
                                                                            <div className={styles.slist}>
                                                                                <div className={styles.slist}>試用品</div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                )
                                                            })}
                                                            {data?.Giftdata?.map((g, i) => {
                                                                return (
                                                                    <ul key={i}>
                                                                        <div className={styles.namebox}>
                                                                            <div className={styles.name}>
                                                                                <dd>
                                                                                    <img src={"/" + g.d_img} />
                                                                                </dd>
                                                                                <dt>
                                                                                    <div className={styles.tt}>{g.title}</div>
                                                                                </dt>
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.numberbox}>
                                                                            <div className={styles.number}>1</div>
                                                                            <div className={styles.price}>---</div>
                                                                        </div>
                                                                        <div className={styles.salesbox}>
                                                                            <div className={styles.slist}>
                                                                                <div className={styles.slist}>滿額贈</div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                )
                                                            })}
                                                            <div className={styles.cart_box_allsbox}>
                                                                <div className={styles.cart_box}>
                                                                    <div className={styles.sign_up_sexbar03}>
                                                                        <div className={styles.spcar_ck_tips}>商品運送方式</div>
                                                                        <div className={styles.off_cudinp_box}>
                                                                            <div className={styles.spcar_ck_tips02}>{data?.Paystatus.d_title}</div>
                                                                        </div>
                                                                        <div className={styles.spcar_ck_tips}>付款方式</div>
                                                                        <div className={styles.off_cudinp_box}>
                                                                            <div className={styles.spcar_ck_tips02}>{data?.Cashflow.d_title}</div>
                                                                        </div>
                                                                        {data?.Odata.d_webatm ? (
                                                                            <div className={styles.spcar_ck_tips02}>
                                                                                銀行代號：007
                                                                                <br />
                                                                                ATM虛擬帳號：
                                                                                {data?.Odata.d_webatm}
                                                                                <br />
                                                                                繳款金額：
                                                                                {parseInt(data?.Odata.d_total)}
                                                                                <br />
                                                                                *請於下單後三天內完成付款，逾期請勿進行繳納。
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className={styles.all02}>
                                                                    <div className={styles.cost}>
                                                                        <ul>
                                                                            <dd>小計</dd>
                                                                            <dt>NT${parseInt(data?.Odata.d_price)}</dt>
                                                                        </ul>
                                                                        {data?.Odata.d_usebonus && (
                                                                            <ul>
                                                                                <dd>使用紅利點數</dd>
                                                                                <dt>
                                                                                    -$
                                                                                    {data?.Odata.d_usebonus}
                                                                                </dt>
                                                                            </ul>
                                                                        )}
                                                                        <ul>
                                                                            <dd>大型運費</dd>
                                                                            <dt>${parseInt(data?.Odata.d_bigfreight)}</dt>
                                                                        </ul>
                                                                        <ul>
                                                                            <dd>一般運費</dd>
                                                                            <dt>${parseInt(data?.Odata.d_freight)}</dt>
                                                                        </ul>
                                                                        <ul>
                                                                            <dd>離島另收</dd>
                                                                            <dt>${parseInt(data?.Odata.d_outisland)}</dt>
                                                                        </ul>
                                                                        {data?.Odata.d_specfreight && data?.Odata.d_orderstatus !== "10" && (
                                                                            <ul>
                                                                                <dd>特殊運費</dd>
                                                                                <dt>${parseInt(data?.Odata.d_specfreight)}</dt>
                                                                            </ul>
                                                                        )}
                                                                        <div className={styles.cart_line}></div>
                                                                        <ul>
                                                                            <dd>
                                                                                <b>總計</b>
                                                                            </dd>
                                                                            <dt>
                                                                                <span className={styles.txt_total}>${parseInt(data?.Odata.d_total)}</span>
                                                                            </dt>
                                                                        </ul>
                                                                        <ul>
                                                                            <dd>
                                                                                {data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
                                                                                <b>本次訂單累計紅利</b>
                                                                                {data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
                                                                            </dd>
                                                                            <dt>
                                                                                {data?.Odata.d_orderstatus === "6" ? `<s>` : ""}${parseInt(data?.Odata.d_bonus)}
                                                                                {data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
                                                                            </dt>
                                                                        </ul>

                                                                        {data?.Odata.d_orderstatus === "6" && (
                                                                            <>
                                                                                <div className={styles.cart_line}></div>
                                                                                <ul>
                                                                                    <dd>
                                                                                        <b>退貨總計</b>
                                                                                    </dd>
                                                                                    <dt>${data?.Odata.d_return_total}</dt>
                                                                                </ul>
                                                                                <ul>
                                                                                    <dd>
                                                                                        <b>退還現金</b>
                                                                                    </dd>
                                                                                    <dt>${data?.Odata.d_return_money}</dt>
                                                                                </ul>
                                                                                <ul>
                                                                                    <dd>
                                                                                        <b>退還紅利</b>
                                                                                    </dd>
                                                                                    <dt>${data?.Odata.d_return_reback}</dt>
                                                                                </ul>
                                                                                {data?.Odata.d_return_pay > 0 ? (
                                                                                    <ul>
                                                                                        <dd>
                                                                                            <b>未符合小物免運標準</b>
                                                                                        </dd>
                                                                                        <dt>補收 ${parseInt(data?.Odata.d_return_pay)}</dt>
                                                                                    </ul>
                                                                                ) : null}
                                                                                <ul>
                                                                                    <dd>
                                                                                        <b>本次訂單累計紅利</b>
                                                                                    </dd>
                                                                                    <dt>${data?.Odata.d_return_point}</dt>
                                                                                </ul>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <div className="gray_bg">
                                                        <div className="container">
                                                            <div className="col-lg-">
                                                                <div className={styles.content_box}>
                                                                    <div className={styles.cart_box02}>
                                                                        <form action="#">
                                                                            <div className={styles.title03}>收件人資料</div>
                                                                            <div className={styles.join_line}></div>
                                                                            <ul className={styles.styled_input}>
                                                                                {data?.Odata.d_cname ? (
                                                                                    <li className={styles.half}>
                                                                                        <h2>公司大名</h2>
                                                                                        <h4>{data?.Odata.d_cname||''}</h4>
                                                                                    </li>
                                                                                ) : null}
                                                                                <li>
                                                                                    <h2>收貨人姓名</h2>
                                                                                    <h4>{data?.Odata.d_name||''}</h4>
                                                                                </li>
                                                                                <li className={styles.half}>
                                                                                    <h2>手機號碼</h2>
                                                                                    <h4>{data?.Odata.d_mobile||''}</h4>
                                                                                </li>
                                                                                {data?.Odata.d_phone ? (
                                                                                    <li className={styles.half}>
                                                                                        <h2>市話</h2>
                                                                                        <h4>{data?.Odata.d_phone||''}</h4>
                                                                                    </li>
                                                                                ) : null}
                                                                                <li>
                                                                                    <h2>E-mail</h2>
                                                                                    <h4>{data?.Odata.d_mail||''}</h4>
                                                                                </li>
                                                                                <li>
                                                                                    <h2>地址</h2>
                                                                                    <h4>{data?.Odata.d_zip + data?.Odata.d_city + data?.Odata.d_area + data?.Odata.d_address||''}</h4>
                                                                                </li>
                                                                                {data?.Odata.d_content ? (
                                                                                    <li>
                                                                                        <h2>備註</h2>
                                                                                        <h4>{data?.Odata.d_content||''}</h4>
                                                                                    </li>
                                                                                ) : null}
                                                                            </ul>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="container">
                                                        <div className="col-lg-">
                                                            <section className={styles.content_box}>
                                                                <div className={styles.cart_box02}>
                                                                    <div className={styles.title03}>發票資訊</div>
                                                                    <div className={styles.join_line}></div>
                                                                    <div className={styles.invoice_list}>
                                                                        <dd>{data?.ITtypedata[data?.Odata.d_invoice]}</dd>
                                                                    </div>
                                                                    {data?.Odata.d_invoice === "3" ? (
                                                                        <ul className="styled-input invoice_box">
                                                                            data?.Odata.d_icname &&
                                                                            <li className="half">
                                                                                <h2>公司大名</h2>
                                                                                <h4>{data?.Odata.d_icname||''}</h4>
                                                                            </li>
                                                                            <li className="half">
                                                                                <h2>統一編號</h2>
                                                                                <h4>{data?.Odata.d_ium||''}</h4>
                                                                            </li>
                                                                            <li>
                                                                                <h2>E-mail</h2>
                                                                                <h4>{data?.Odata.d_imail||''}</h4>
                                                                            </li>
                                                                            <li>
                                                                                <h2>中獎寄送地址</h2>
                                                                                <h4>
                                                                                    {data?.Odata.d_Invoicezip +
                                                                                        data?.Odata.d_Invoicecity +
                                                                                        data?.Odata.d_Invoicearea +
                                                                                        data?.Odata.d_iaddress||''}
                                                                                </h4>
                                                                            </li>
                                                                            <div className={styles.cart_line}></div>
                                                                        </ul>
                                                                    ) : null}
                                                                    <div className={styles.cart_line}></div>
                                                                </div>
                                                                <div className={styles.text_right} style={{marginTop: "30px"}}>
                                                                    <input type="button" className={styles.btn_style07} value="列印訂單" onClick={(e)=>{console.log(e)}} />
                                                                    {data?.Odata.d_orderstatus === "11" ? (
                                                                        <input
                                                                            type="button"
                                                                            className={styles.btn_style07}
                                                                            /* style="background-color:#ff3c6c;color:#fff" */
                                                                            value="同意付款"
                                                                            onClick={(e)=>console.log(e)}/* "location='<?echo site_url('member/orders/specPay/'.$Odata['d_id']);?>'" */
                                                                        />
                                                                    ) : (
                                                                        <input
                                                                            type="button"
                                                                            className={styles.btn_style07}
                                                                            value="訂單查詢"
                                                                            onClick={(e)=>console.log(e)}/* "location='<?echo site_url('member/orders');?>'" */
                                                                        />
                                                                    )}
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
	
    </>
    
    )
}

export default OrderInfo
