const ShowFilter = ({ setModal,modal }) => {
    return (
        <>
            <div className="sort-by-product-wrap">
                <div className="sort-by">
                    <span onClick={()=>setModal(!modal)}>
                        <i className="fi-rs-settings-sliders"></i>
                       {/*  Show: */}
                    </span>
                </div>
                {/* <div className="sort-by-dropdown-wrap custom-select">
                    <select onChange={selectChange}>
                        <option value={showLimit}>{showLimit}</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div> */}
            </div>
        </>
    );
}
export default ShowFilter;
