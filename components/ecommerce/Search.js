import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = ({data}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        console.log("click");
        router.push({
            pathname: "/products",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    return (
        <>
            <form>
                <select className="select-active">
                    <option>選擇分類</option>
                    {data?Object.entries(data).map((op,index)=>{
                        return(
                          <option key={index}>{op[0].split('_')[0]}</option>  
                        )
                    }):<>
                    <option>Women's</option>
                    <option>Men's</option>
                    <option>Cellphones</option>
                    <option>Computer</option>
                    <option>Electronics</option>
                    <option> Accessories</option>
                    <option>Home & Garden</option>
                    <option>Luggage</option>
                    <option>Shoes</option>
                    <option>Mother & Kids</option>
                    </>}
                </select>
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="商品名"
                />
                <button type="submit"><i className="fi-rs-search"></i></button>
            </form>
        </>
    );
};

export default Search;
