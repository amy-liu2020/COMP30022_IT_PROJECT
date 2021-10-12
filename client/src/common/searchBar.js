import { FaSearch, FaFilter } from "react-icons/fa";

const SearchBar = () => {
    return (
        <form className="nav-search">
            <button className="nav-search-filter">
                <FaFilter size={14} />
            </button>
            <input className="nav-search-input" type="search" />
            <button className="nav-search-submit">
                <FaSearch size={14} />
            </button>
        </form>
    );
};

export default SearchBar;
