import Select from "react-select";
import { useEffect, useState } from "react/cjs/react.development";
import { GetTags } from "../api";

const Tag = ({ tagOf, defaultValue = null, setSelectedOption, isDisabled }) => {
    const { tags, loading, error } = GetTags(tagOf);

    return (
        <Select
            defaultValue={defaultValue}
            onChange={setSelectedOption}
            options={tags}
            isMulti
            isLoading={loading || error}
            isDisabled={isDisabled}
        />
    );
};
export default Tag;
