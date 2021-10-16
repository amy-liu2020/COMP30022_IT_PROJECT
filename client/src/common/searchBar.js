import { FaSearch, FaFilter } from "react-icons/fa";
import { useHistory } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchBar = () => {
    let history = useHistory();
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = (data) => {
        history.push(`/contact/search/${data.keyword}`);
    };

    return (
        <form className="nav-search" onSubmit={handleSubmit(onSubmitHandler)}>
            <input
                {...register("keyword", {
                    required: true,
                })}
                className="nav-search-input"
                type="search"
            />
            <button className="nav-search-submit">
                <FaSearch size={14} />
            </button>
        </form>
    );
};

export default SearchBar;
