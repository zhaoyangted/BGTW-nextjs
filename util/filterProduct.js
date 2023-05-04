// Filter Products By Filters

export default (productList, filters) => {
    let filteredList = [...productList];
    //console.log(filters)
    for (const key in filters) {
        if (key !== "price") {
            /* if (
                filters["featured"] !=="1"  ||
                 filters[key] === "trending" ||
                filters[key] === "lowToHigh" ||
                filters[key] === "highToLow"
                
            ) {
                if (filters["featured"] === "3") {
                    filteredList = [
                        ...filteredList.sort((a, b) => {
                            if (a.d_price < b.d_price) return -1;
                            if (a.d_price > b.d_price) return 1;
                        }),
                    ];
                } else {
                    if (filters["featured"] === "4") {
                        console.log("hi");
                        filteredList = [
                            ...filteredList.sort((a, b) => {
                                if (b.d_price < a.d_price) return -1;
                                if (b.d_price > a.d_price) return 1;
                            }),
                        ];
                    } else {
                        console.log("hi1");
                        filteredList = filteredList.filter(
                            (item) => item[filters[key]]
                        );
                    }
                }
            } else {
                if (filters["featured"] !=="1") {
                    filteredList = [
                        ...filteredList.sort((a, b) => {
                            if (a.d_id < b.d_id) return -1;
                            if (a.d_id > b.d_id) return 1;
                        }),
                    ];
                } else {
                    filteredList = [
                    ...filteredList.sort((a, b) => {
                        if (b.d_id < a.d_id) return -1;
                        if (b.d_id > a.d_id) return 1;
                    }),
                ];
                }
                //filteredList = filterByKey(filteredList, filters[key], key);
                return filteredList
            } */
            return filteredList
        } else {
            filteredList = filterByPrice(filteredList, filters[key], key);
        }
    }
    //console.log(filteredList)
    return filteredList;
};

// Filter Product By Price

function filterByPrice(filteredList, price, key) {
    let list = [];

    for (let index = 0; index < filteredList.length; index++) {
        const product = filteredList[index];
        const productPrice = product.d_price;

        if (productPrice >= price.min && productPrice <= price.max) {
            list.push(product);
        }
    }

    return (filteredList = list);
}

// Filter Product by key size/category/brand etc

function filterByKey(filteredList, size, key) {
    let list = [];
    if (!size || size.length === 0) return filteredList;
    for (let index = 0; index < filteredList.length; index++) {
        const product = filteredList[index];

        if (size.indexOf != undefined) {
            const isOk = size && size.indexOf(product[key]);
            if (isOk !== -1) {
                list.push(product);
            }
        }
    }

    return (filteredList = list);
}
