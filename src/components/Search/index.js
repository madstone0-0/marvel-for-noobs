import React from "react";
import { Input } from "semantic-ui-react";

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

export default Search;
