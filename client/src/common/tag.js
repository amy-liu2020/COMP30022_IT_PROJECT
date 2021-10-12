import Select from "react-select";
import { GetTags } from "../api";

const Tag = ({
    tagOf,
    defaultValue = null,
    setSelectedTags,
    isDisabled = false,
}) => {
    const { tags, loading, error } = GetTags(tagOf);

    return (
        <Select
            defaultValue={defaultValue}
            onChange={setSelectedTags}
            options={tags}
            isMulti
            isLoading={loading || error}
            isDisabled={isDisabled}
        />
    );
};
export default Tag;
