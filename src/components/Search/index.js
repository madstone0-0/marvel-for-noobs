import PropTypes from "prop-types";
import React from "react";
import { Input } from "semantic-ui-react";
import { useCharacters } from "../hooks/character-info-hook";

/**
 * Search bar component
 */
const Search = ({ children }) => {
    const { searchCharacter, searchChange, searchSubmit } = useCharacters();
    return (
        <form className="search-bar" onSubmit={searchSubmit}>
            <Input
                type="text"
                size="large"
                onChange={searchChange}
                value={searchCharacter}
                placeholder="Character name"
            />
            <button type="submit" className="ui red large button search-button">
                {children}
            </button>
        </form>
    );
};

export default Search;
