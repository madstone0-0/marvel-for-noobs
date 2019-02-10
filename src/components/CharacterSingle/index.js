import React from "react";
import { Link } from "react-router-dom";

const CharacterSingle = ({ id, name, description, thumbnail }) => (
    <div className="grid-figure">
        <Link to="/">
            <img
                src={`${thumbnail.path}/portrait_fantastic.${
                    thumbnail.extension
                }`}
                alt={name}
                className="single-photo"
            />
        </Link>
        <h2 className="character-name">{name}</h2>
        <p className="description">
            {description === ""
                ? "No description listed for this character."
                : description}
        </p>
    </div>
);

export default CharacterSingle;
