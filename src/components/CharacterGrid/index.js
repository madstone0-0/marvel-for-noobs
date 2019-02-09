import React from "react";
import { Route } from "react-router-dom";

import Search from "../Search";
import CharacterSingle from "../CharacterSingle";
import Character from "../Character";

const CharacterGrid = ({
    characters,
    searchCharacter,
    onChange,
    onSearchSubmit,
    isSearched,
    value,
}) => (
    <div>
        <Search
            value={value}
            children="Search"
            onSubmit={onSearchSubmit}
            onChange={onChange}
        />
        <div className="character-grid">
            {characters
                .filter(isSearched(searchCharacter))
                .map((character, key) => {
                    return (
                        <div key={key}>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Character character={character} />
                                )}
                            />
                            <Route
                                path={`/${character.id}`}
                                render={() => (
                                    <CharacterSingle
                                        name={character.name}
                                        id={character.id}
                                        description={character.description}
                                        thumbnail={character.thumbnail}
                                    />
                                )}
                            />
                        </div>
                    );
                })}
        </div>
    </div>
);

export default CharacterGrid;
