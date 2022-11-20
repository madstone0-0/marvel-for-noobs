import PropTypes from "prop-types";
import React from "react";
import { Input } from "semantic-ui-react";

/**
 * Search bar component
 */
const Search = ({ value, onChange, onSubmit, children }) => (
    <form className="search-bar" onSubmit={onSubmit}>
        <Input
            type="text"
            size="large"
            onChange={onChange}
            value={value}
            placeholder="Character name"
        />
        <button type="submit" className="ui red large button search-button">
            {children}
        </button>
    </form>
);

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
};

export default Search;
