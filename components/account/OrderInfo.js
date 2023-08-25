import React from "react"
import styles from "../../components/account.module.css"
import useSWR from "swr"
import { useRouter } from "next/router"
import axios from "axios"
const OrderInfo = () => {
	const { query } = useRouter()
	const orderId = query.orderId
	const fetcher = (url) => axios(url, { credentials: "include" }).then((r) => r.json())
	const { data, loading, error } = useSWR(process.env.apiServer + "/api/member/orders/info/" + { orderId }, fetcher)
    /* function number_format(user_input){
        var filtered_number = user_input.replace(/[^0-9]/gi, '');
        var length = filtered_number.length;
        var breakpoint = 1;
        var formated_number = '';
    
        for(i = 1; i <= length; i++){
            if(breakpoint > 3){
                breakpoint = 1;
                formated_number = ',' + formated_number;
            }
            var next_letter = i + 1;
            formated_number = filtered_number.substring(length - i, length - (i - 1)) + formated_number; 
    
            breakpoint++;
        }
    
        return formated_number;
    } */
	return (
		<>
			<section className="content_box03">
				{data?.Odata.d_orderstatus !== 10 ? (
					data?.Odata.d_pay === 4 ? (
						<div
							className="center w14"
							/* style="font-size: 18px;background-color: #ff3c6c;color: #fff;font-weight: bolder;" */
						>
							您的轉帳資料已寄送至收件人信箱，準備可上網之電腦，持任一家金融機構發行之晶片金融卡且已申請非約定轉帳服務功能就可繳款。
						</div>
					) : data?.Odata.d_orderstatus === 11 ? (
						<div
							className="center w14" /* style="font-size: 18px;background-color: #ff3c6c;color: #fff;font-weight: bolder;" */
						>
							您的訂單內含有特殊運費之商品，目前已完成運費報價，點選下方同意付款，即可完成該訂單。
						</div>
					) : (
						<div
							className="center w14" /* style="font-size: 18px;background-color: #ff3c6c;color: #fff;font-weight: bolder;" */
						>
							您訂購的商品中包含特殊運費商品，因此訂單尚未建立完成。
							<br />
							`待運費報價後，方可繼續進行付款作業。`
						</div>
					)
				) : null}
				<div
					className="center w14" /* style="font-size: 18px;background-color: #ff3c6c;color: #fff;font-weight: bolder;" */
				>
					{data?.Odata.d_orderstatus !== "10" ? "您的訂單資料已確認送出，" : ""}
					我們將盡快處理，謝謝！如有任何問題或意見，請聯繫我們。
				</div>
				<div className="order02">
					<ul>
						<li>
							<div className="dbox">
								<dd>訂單編號</dd>
								<em>
									<a href={"/member/orders/" + data?.$Odata.OID}>{data?.Odata.OID}</a>
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
								<b>{number_format(data?.Odata.d_total)}</b>
							</div>
							<div className="dbox">
								<dd>付款方式</dd>
								{data?.Cashflow.d_title ? data?.Cashflow.d_title : "付款方式已不存在"}
							</div>
						</li>
						<li>
							<div className="dbox">
								<dd>訂單狀態</dd>
								{data?.Order_status[data?.Odata.d_orderstatus]}
							</div>
							<div className="dbox">
								<dd>付款狀態</dd>
								{data?.Pay_status[data?.$Odata.d_paystatus]}
							</div>
						</li>
					</ul>
				</div>
				<div className="cart02" /* style="margin-top:30px;" */>
					<div className="titlebox">
						<div className="name">商品</div>
						<div className="number">數量</div>
						<div className="price">小計</div>
					</div>
					{data?.Detaildata?.map((d, i) => {
						return (
							<ul>
								<div className="namebox">
									<div className="name">
										<dd>
											<img src={process.env.s3Host + d.d_img} />
										</dd>
										<dt>
											<div className="tt">
												{d.d_title +
													(d.d_status == "3" || d.status === "4" ? (
														<span /* style="color:red" */>(退貨商品)</span>
													) : (
														""
													))}
											</div>
											<div className="sbox">
												<div className="dtt">商品編號</div>
												<div className="spec">{d.d_model}</div>
											</div>
											<div className="sbox">
												<div className="dtt">單價</div>
												<div className="spec">
													<span>NT$+{number_format(d.d_price)}</span>
												</div>
											</div>
											{d.d_addtitle ? (
												<div className="sbox">
													<div className="dtt">商品加購</div>
													<div className="spec">{d.d_addtitle + "+ NT$" + d.d_addprice}</div>
												</div>
											) : null}
											<div className="sbox">
												<div className="dtt">出貨日期</div>
												<div className="spec">{d.d_ship_date !== "0000-00-00" ? d.d_ship_date : "無"}</div>
											</div>
											<div className="sbox">
												<div className="dtt">到貨日期</div>
												<div className="spec">{d.d_arrival_date !== "0000-00-00" ? d.d_arrival_date : "無"}</div>
											</div>
											<div className="sbox">
												<div className="dtt">物流單號</div>
												<div className="spec">{d.d_shipnumber !== "0000-00-00" ? d.d_shipnumber : "無"}</div>
											</div>
											<div className="sbox">
												<div className="dtt">物流商</div>
												<div className="spec">
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
								<div className="numberbox">
									<div className="number">{d.d_num}</div>
									<div className="price">$NT+{number_format(d_d_total)}</div>
								</div>
								{d.Stitle ? (
									<div className="salesbox">
										<div className="slist">
											<div className="icon">
												<span className="icon_ok">符合</span>
											</div>
											<div className="sales">
												<a href="javascript:void(0)">{d.Stitle}</a>
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
								<div className="namebox">
									<div className="name">
										<dd>
											<img src={process.env.s3Host+a.d_img} />
										</dd>
										<dt>
											<div className="tt">{a.d_title}</div>
											<div className="sbox">
												<div className="dtt">單價</div>
												<div className="spec">
													<span>NT$+{number_format(a.d_price)}</span>
												</div>
											</div>
										</dt>
									</div>
								</div>
								<div className="numberbox">
									<div className="number">1</div>
									<div className="price">
										$NT+
										{a.d_price}
									</div>
								</div>
								<div className="salesbox">
									<div className="slist">
										<div className="slist">加價購</div>
									</div>
								</div>
							</ul>
						)
					})}
					{data?.Trialdata?.map((t, i) => {
						return (
							<ul key={i}>
								<div className="namebox">
									<div className="name">
										<dd>
											<img src={process.env.s3Host + t.d_img} />
										</dd>
										<dt>
											<div className="tt">{t.d_title}</div>
											<div className="sbox">
												<div className="dtt">商品編號</div>
												<div className="spec">{t.d_model}</div>
											</div>
										</dt>
									</div>
								</div>
								<div className="numberbox">
									<div className="number">1</div>
									<div className="price">---</div>
								</div>
								<div className="salesbox">
									<div className="slist">
										<div className="slist">試用品</div>
									</div>
								</div>
							</ul>
						)
					})}
					{data?.Giftdata?.map((g, i) => {
						return (
							<ul>
								<div className="namebox">
									<div className="name">
										<dd>
											<img src={"/" + g.d_img} />
										</dd>
										<dt>
											<div className="tt">{g.title}</div>
										</dt>
									</div>
								</div>
								<div className="numberbox">
									<div className="number">1</div>
									<div className="price">---</div>
								</div>
								<div className="salesbox">
									<div className="slist">
										<div className="slist">滿額贈</div>
									</div>
								</div>
							</ul>
						)
					})}
					<div className="cart_box_allsbox">
						<div className="cart_box">
							<div className="sign_up_sexbar03">
								<div className="spcar_ck_tips">商品運送方式</div>
								<div className="off_cudinp_box">
									<div className="spcar_ck_tips02">{data?.Pay_status.d_title}</div>
								</div>
								<div className="spcar_ck_tips">付款方式</div>
								<div className="off_cudinp_box">
									<div className="spcar_ck_tips02">{data?.Cashflow.d_title}</div>
								</div>
								{data?.Odata.d_webatm ? (
									<div className="spcar_ck_tips02">
										銀行代號：007
										<br />
										ATM虛擬帳號：
										{data?.Odata.d_webatm}
										<br />
										繳款金額：
										{number_format(data?.Odata.d_total)}
										<br />
										*請於下單後三天內完成付款，逾期請勿進行繳納。
									</div>
								) : null}
							</div>
						</div>
						<div className="all02">
							<div className="cost">
								<ul>
									<dd>小計</dd>
									<dt>NT${number_format(data?.Odata.d_price)}</dt>
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
									<dt>${number_format(data?.Odata.d_bigfreight)}</dt>
								</ul>
								<ul>
									<dd>一般運費</dd>
									<dt>${number_format(data?.Odata.d_freight)}</dt>
								</ul>
								<ul>
									<dd>離島另收</dd>
									<dt>${number_format(data?.Odata.d_outisland)}</dt>
								</ul>
								{data?.Odata.d_specfreight && data?.Odata.d_orderstatus !== "10" && (
									<ul>
										<dd>特殊運費</dd>
										<dt>${number_format(data?.Odata.d_specfreight)}</dt>
									</ul>
								)}
								<div className="cart_line"></div>
								<ul>
									<dd>
										<b>總計</b>
									</dd>
									<dt>
										<span className="txt_total">${number_format(data?.Odata.d_total)}</span>
									</dt>
								</ul>
								<ul>
									<dd>
										{data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
										<b>本次訂單累計紅利</b>
										{data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
									</dd>
									<dt>
										{data?.Odata.d_orderstatus === "6" ? `<s>` : ""}${number_format(data?.Odata.d_bonus)}
										{data?.Odata.d_orderstatus === "6" ? `<s>` : ""}
									</dt>
								</ul>

								{data?.Odata.d_orderstatus === "6" && (
									<>
										<div className="cart_line"></div>
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
												<dt>補收 ${number_format(data?.Odata.d_return_pay)}</dt>
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
						<div className="content_box">
							<div className="cart_box02">
								<form action="javascript:void(0)">
									<div className="title03">收件人資料</div>
									<div className="join_line"></div>
									<ul className="styled-input">
										{data?.Odata.d_cname ? (
											<li className="half">
												<h2>公司大名</h2>
												<h4>{data?.Odata.d_cname}</h4>
											</li>
										) : null}
										<li>
											<h2>收貨人姓名</h2>
											<h4>{data?.Odata.d_name}</h4>
										</li>
										<li className="half">
											<h2>手機號碼</h2>
											<h4>{data?.Odata.d_mobile}</h4>
										</li>
										{data?.Odata.d_phone ? (
											<li className="half">
												<h2>市話</h2>
												<h4>{data?.Odata.d_phone}</h4>
											</li>
										) : null}
										<li>
											<h2>E-mail</h2>
											<h4>{data?.Odata.d_mail}</h4>
										</li>
										<li>
											<h2>地址</h2>
											<h4>{data?.Odata.d_zip + data?.Odata.d_city + data?.Odata.d_area + data?.Odata.d_address}</h4>
										</li>
										{data?.Odata.d_content ? (
											<li>
												<h2>備註</h2>
												<h4>{data?.Odata.d_content}</h4>
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
					<section className="content_box">
						<div className="cart_box02">
							<div className="title03">發票資訊</div>
							<div className="join_line"></div>
							<div className="invoice_list">
								<dd>{data?.ITtypedata[data?.Odata.d_invoice]}</dd>
							</div>
							{data?.Odata.d_invoice === "3" ? (
								<ul className="styled-input invoice_box">
									data?.Odata.d_icname &&
									<li className="half">
										<h2>公司大名</h2>
										<h4>{data?.Odata.d_icname}</h4>
									</li>
									<li className="half">
										<h2>統一編號</h2>
										<h4>{data?.Odata.d_ium}</h4>
									</li>
									<li>
										<h2>E-mail</h2>
										<h4>{data?.Odata.d_imail}</h4>
									</li>
									<li>
										<h2>中獎寄送地址</h2>
										<h4>
											{data?.Odata.d_Invoicezip +
												data?.Odata.d_Invoicecity +
												data?.Odata.d_Invoicearea +
												data?.Odata.d_iaddress}
										</h4>
									</li>
									<div className="cart_line"></div>
								</ul>
							) : null}
							<div className="cart_line"></div>
						</div>
						<div className="text_right" /* style="margin-top: 30px;" */>
							<input type="button" className="btn-style07" value="列印訂單" onclick="printDiv();" />
							{data?.Odata.d_orderstatus === "11" ? (
								<input
									type="button"
									className="btn-style07"
									/* style="background-color:#ff3c6c;color:#fff" */
									value="同意付款"
									onClick="location='<?echo site_url('member/orders/specPay/'.$Odata['d_id']);?>'"
								/>
							) : (
								<input
									type="button"
									className="btn-style07"
									value="訂單查詢"
									onClick="location='<?echo site_url('member/orders');?>'"
								/>
							)}
						</div>
					</section>
				</div>
			</div>
		</>
	)
}

export default OrderInfo
