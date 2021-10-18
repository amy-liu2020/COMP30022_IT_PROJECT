import { GetTags, GetContacts } from "../api";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import { useForm, Controller } from "react-hook-form";

import Select from "react-select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Tag = ({
    tagOf,
    defaultValue = null,
    setSelectedTags,
    isDisabled = false,
}) => {
    const { tags, loading, error } = GetTags(tagOf);

    const formatTag = (tags) => {
        let options = Object.assign({}, tags); // clone tags

        options.value = options._id;
        options.label = options.TagName;

        return options;
    }

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

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

export const SelectTags = ({control, tagOf, isDisabled=false}) => {
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


export const SelectContact = ({control}) => {
    const { contacts, loading, error } = GetContacts();

    const formatOpt = (contacts) => {
        let options = JSON.parse(JSON.stringify(contacts)); // clone tags

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
            name="Invitees"
            render={({ field }) => (
                <Select
                    isMulti={true}
                    isLoading={loading || error}
                    {...field}
                    options={contacts ? formatOpt(contacts) : []}
                />
            )}
        />
    );
};

export default Tag;
