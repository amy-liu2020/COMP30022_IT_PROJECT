import { GetTags } from "../api";
import {Controller } from "react-hook-form";
import Select from "react-select";

const SelectTags = ({control, tagOf, isDisabled=false}) => {
    const { tags, loading, error } = GetTags(tagOf);

    const formatTag = (tags) => {
        let options = JSON.parse(JSON.stringify(tags)); // clone tags

        options.map(opt => {
            opt.TagId = opt._id;
            opt.value = opt._id;
            opt.label = opt.TagName;
        })

        return options;
    }

    return (
        <Controller
            control={control}
            name="Tags"
            render={({ field }) => (
                <Select
                    isMulti={true}
                    isLoading={loading || error}
                    {...field}
                    isDisabled={isDisabled}
                    options={tags ? formatTag(tags) : []}
                />
            )}
        />
    );
};

export default SelectTags;