import Select from "react-select";
import { useEffect, useState } from "react/cjs/react.development";
import { getGroups } from "../api";

const Tag = ({ tab, defaultValue=null, setSelectedOption}) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags(getGroups(tab));
    }, [tab]);
    return (
        <Select
            defaultValue={defaultValue}
            onChange={setSelectedOption}
            options={tags}
            isMulti
        />
    );
};
export default Tag;
