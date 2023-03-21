import React, { useState } from "react";
import Head from "next/head";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import useFetch from "../../util/useFetch"
const Layout = ({
    children,
    parent,
    sub,
    subChild,
    noBreadcrumb,
    headerStyle,
}) => {
    const [isToggled, setToggled] = useState(false);
    const { data, loading, error } = useFetch(`/api/menus/`)
    const  {data:config,isLoading:configLoading,error:configError}  = useFetch(`/api/menus/config/`)
    const toggleClick = () => {
        setToggled(!isToggled);
        isToggled
            ? document
                  .querySelector("body")
                  .classList.remove("mobile-menu-active")
            : document
                  .querySelector("body")
                  .classList.add("mobile-menu-active");
    };

    return (
        
        <>
        {/* {console.log(data)} */}
            <Head>
                <title>{config?Object.values(config)[1]:"台灣美麗平台線上購物商城"}</title>
                <meta name="description" content={config?Object.values(config)[7]:"BGTW new front"} />
                <link rel="icon" href="/assets/imgs/favicon/favicon.ico" />
            </Head>

            {isToggled && <div className="body-overlay-1" onClick={toggleClick}></div>}

            <Header headerStyle={headerStyle} isToggled={isToggled} toggleClick={toggleClick} data={data} config={config}/>
            <MobileMenu isToggled={isToggled} toggleClick={toggleClick} data={data}/>
            <main className="main">
                <Breadcrumb parent={parent} sub={sub} subChild={subChild} noBreadcrumb={noBreadcrumb} />
                {children}
            </main>
            <Footer data={config}/>
        </>
    );
};

export default Layout;
