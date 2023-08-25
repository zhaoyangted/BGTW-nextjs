import React,{useState} from "react";
import { Modal } from 'react-responsive-modal';
import CategoryProduct from "./Filter/CategoryProduct";



const FilterModale = ({types,menus,titles,modal,setModalClose}) => {
    
    return (
        <>
            {types&&<Modal
				open={modal}
				onClose = {setModalClose}
                center={true} 
                classNames={{ modal: "full-modal" }}
				>
				<div className="">
								<div className="sidebar-widget  mb-30">
									<h5 className="section-title style-1 mb-30">{titles}</h5>
									<CategoryProduct menuDatas={types} menus={menus} />
								</div>
							</div>
				
				</Modal>}
        </>
    );
};


export default FilterModale
