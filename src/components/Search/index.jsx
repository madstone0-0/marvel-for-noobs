import PropTypes from "prop-types";
import React from "react";
import { Input } from "semantic-ui-react";
import { useCharacters } from "../hooks";

/**
 * Search bar component
 */
const Search = ({
    onSearchSubmit,
    onSearchChange,
    value,
    children = "Search",
    style = {},
    placeholder = "",
}) => {
    return (
        <form
            style={{ ...style }}
            className="search-bar"
            onSubmit={onSearchSubmit}
        >
            <Input
                className="search-input"
                type="text"
                size="large"
                onChange={onSearchChange}
                value={value}
                placeholder={placeholder}
            />
            <button type="submit" className="ui red large button search-button">
                {children}
            </button>
        </form>
    );
};

export default Search;
