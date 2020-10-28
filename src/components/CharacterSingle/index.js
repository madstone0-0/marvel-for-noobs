import React from "react";
import { Link } from "react-router-dom";

const CharacterSingle = ({
    id,
    name,
    description,
    thumbnail,
    comics,
    events,
    urls,
}) => (
    <div className="charcter-single grid-figure">
        <Link to="/characters">
            <img
                src={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
                alt={name}
                className="single-photo"
            />
        </Link>
        <h2 className="character-name">{name}</h2>
        <p className="description">
            {description === ""
                ? "No description listed for this character/group in the Marvel API. Please click the wiki link below the events section to find out more at the official marvel website"
                : description}
        </p>
        <br />
        <h2>Comics</h2>
        {comics.items.map((comic, key) => (
            <div key={key}>
                <h3>
                    {comic.available === 0
                        ? "No comics listed for this character"
                        : comic.name}
                </h3>
            </div>
        ))}
        <br />
        <h2>Events</h2>
        {events.items.map((characterEvent, key) => (
            <div key={key}>
                <h3>
                    {characterEvent.available === 0
                        ? `${name} events have not been listed`
                        : characterEvent.name}
                </h3>
            </div>
        ))}
        <br />
        <br />
        <div>
            {urls.map((link, key) => (
                <div>
                    <br />
                    <h3 style={{ marginTop: "5px" }}>{link.type}</h3>
                    <a
                        key={key}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link.url}
                    >
                        Read More
                    </a>
                </div>
            ))}
        </div>
    </div>
);

export default CharacterSingle;
