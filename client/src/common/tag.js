import Select from "react-select";
import { useEffect, useState } from "react/cjs/react.development";
import { GetTags } from "../api";

const Tag = ({ tagOf, defaultValue=null, setSelectedOption}) => {
    const {tags, loading, error} = GetTags(tagOf)

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
