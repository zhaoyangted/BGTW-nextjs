import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const Tags = ({ updateProductFilters }) => {
    const router = useRouter();
    const tags = [
        { value: "" },
        { value: "1",title:"red" },
        { value: "2",title:"blue" },
        { value: "3",title:"green" },
        { value: "4",title:"yellow" },
        { value: "5",title:"brown" },
        { value: "6" ,title:"purple"},
        { value: "7" ,title:"white"},
    ];
    const [selectedTags, setTags] = useState([]);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const filters = {
            tags: selectedTags, //
        };

        updateProductFilters(filters);
    }, [selectedTags]);

    const handleClick = (i, target) => {
        setTags(target);
        setActive(active == i ? 0 : i);
    };
    return (
        <>
            <ul className="tags-list">
                {tags.map((tag, i) => (
                    <li  className="hover-up" onClick={() => handleClick(i, tag.value)} key={i}>
                        <a
                            className={
                                active == i
                                    ? "cat-item text-brand-2"
                                    : "cat-item text-brand"
                            }
                        ><i className="fi-rs-cross mr-10"></i>
                            {i == 0 ? "All" : `${tag.title}`}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(null, mapDidpatchToProps)(Tags);
