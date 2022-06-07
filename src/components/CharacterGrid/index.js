import React from "react";
import { Route, Routes } from "react-router-dom";

import Search from "../Search";
import CharacterSingle from "../CharacterSingle";
import Character from "../Character";

/**
 * Displays all recieved character items in a grid using the Character and CharacterSingle components
 */
const CharacterGrid = ({
    characters,
    searchCharacter,
    onChange,
    onSubmit,
    value,
}) => (
    <div>
        <Search
            value={value}
            children="Search"
            onSubmit={onSubmit}
            onChange={onChange}
        />
        <div className="character-grid">
            {characters.map((character, key) => {
                return (
                    <div key={key}>
                        <Routes>
                            <Route
                                path="/"
                                element={<Character character={character} />}
                            />
                            <Route
                                exact
                                path={`${character.id}`}
                                element={
                                    <CharacterSingle
                                        name={character.name}
                                        id={character.id}
                                        description={character.description}
                                        thumbnail={character.thumbnail}
                                        comics={character.comics}
                                        events={character.events}
                                        urls={character.urls}
                                    />
                                }
                            />
                        </Routes>
                        {/* <Character character={character} /> */}
                    </div>
                );
            })}
        </div>
    </div>
);

export default CharacterGrid;
