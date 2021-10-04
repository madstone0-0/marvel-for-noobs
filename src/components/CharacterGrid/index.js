import React from "react";
import { Route } from "react-router-dom";

import Search from "../Search";
import CharacterSingle from "../CharacterSingle";
import Character from "../Character";

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
                        <Route
                            exact
                            path="/characters"
                            render={() => <Character character={character} />}
                        />
                        <Route
                            path={`/characters/${character.id}`}
                            render={() => (
                                <CharacterSingle
                                    name={character.name}
                                    id={character.id}
                                    description={character.description}
                                    thumbnail={character.thumbnail}
                                    comics={character.comics}
                                    events={character.events}
                                    urls={character.urls}
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
