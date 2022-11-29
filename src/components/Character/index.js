import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useCharacters } from "../hooks";

/**
 * Single Character item displayed in CharacterGrid can be clicked on to
 * show more information about character (CharacterSingle)
 */
const Character = ({ character }) => {
    const { changeCurrentView } = useCharacters();
    const { id, name, thumbnail } = character;
    return (
        <div onClick={changeCurrentView} className="ui">
            <figure className="grid-figure">
                <div className="grid-photo-wrap">
                    <Link key={id} to={`${id}`}>
                        <img
                            src={`${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`}
                            alt={name}
                            className="grid-photo"
                        />
                    </Link>
                </div>

                <figcaption>
                    <Link key={id} to={`${id}`}>
                        <p className="character-name">{name}</p>
                    </Link>
                </figcaption>
            </figure>
        </div>
    );
};

export default Character;
