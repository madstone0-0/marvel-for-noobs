import React from "react";
import { Link } from "react-router-dom";

const Character = ({ character }) => (
    <div className="ui">
        <figure className="grid-figure">
            <div className="grid-photo-wrap">
                <Link to={`/characters/${character.id}`}>
                    <img
                        src={`${character.thumbnail.path}/portrait_fantastic.${
                            character.thumbnail.extension
                        }`}
                        alt={character.name}
                        className="grid-photo"
                    />
                </Link>
            </div>

            <figcaption>
                <Link to={`/characters/${character.id}`}>
                    <p className="character-name">{character.name}</p>
                </Link>
            </figcaption>
        </figure>
    </div>
);

export default Character;
