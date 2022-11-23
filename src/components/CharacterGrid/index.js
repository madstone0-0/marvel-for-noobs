import React from "react";
import { Route, Routes } from "react-router-dom";

import classNames from "classnames";
import PropTypes from "prop-types";
import Character from "../Character";
import CharacterSingle from "../CharacterSingle";
import { useCharacters } from "../hooks/character-info-hook";
import Search from "../Search";
import RestoreScrollOnMount from "../utils/RestoreScrollOnMount";

/**
 * Displays all received character items in a grid using the Character and CharacterSingle components
 */
const CharacterGrid = () => {
    const {
        characters,
        searchCharacter,
        searchChange,
        searchSubmit,
        currentView,
        changeCurrentView,
    } = useCharacters();
    return (
        <>
            <RestoreScrollOnMount view={currentView} />
            <Search children="Search" />
            <div
                className={classNames("character-grid", {
                    "character-grid-single": currentView !== "grid",
                })}
            >
                {characters.map((character, key) => {
                    return (
                        <div key={key}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Character character={character} />
                                    }
                                />
                                <Route
                                    exact
                                    path={`${character.id}`}
                                    element={
                                        <CharacterSingle
                                            character={character}
                                        />
                                    }
                                />
                            </Routes>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CharacterGrid;
