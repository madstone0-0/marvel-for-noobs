import React from "react";
import { Link } from "react-router-dom";

/**
 * Single Character item displayed in CharacterGrid can be clicked on to
 * show more information about character (CharacterSingle)
 */
const Character = ({ character }) => (
    <div className="ui">
        <figure className="grid-figure">
            <div className="grid-photo-wrap">
                <Link key={character.id} to={`${character.id}`}>
                    <img
                        src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="grid-photo"
                    />
                </Link>
            </div>

            <figcaption>
                <Link key={character.id} to={`${character.id}`}>
                    <p className="character-name">{character.name}</p>
                </Link>
            </figcaption>
        </figure>
    </div>
);

export default Character;
