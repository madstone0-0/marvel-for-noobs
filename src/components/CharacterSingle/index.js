import React from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../constants/index";

const CharacterSingle = ({
    id,
    name,
    description,
    thumbnail,
    comics,
    events,
}) => (
    <div className="grid-figure">
        <Link to="/">
            <img
                src={`${thumbnail.path}/portrait_uncanny.${
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
        <h2>Comics</h2>
        {comics.items.map((comic, key) => (
            <div key={key}>
                <h3>
                    {comic.name === ""
                        ? "No comics listed for this character"
                        : comic.name}
                </h3>
            </div>
        ))}
        <h2>Events</h2>
        {events.items.map((characterEvent, key) => (
            <div key={key}>
                <h3>
                    {characterEvent.name === ""
                        ? `${name} events have not been listed`
                        : characterEvent.name}
                </h3>
            </div>
        ))}
    </div>
);

export default CharacterSingle;
