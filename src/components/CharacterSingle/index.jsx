import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import ComicGrid from "../ComicGrid";
import SubGrid from "../SubGrid";
import {
    API_KEY,
    FORMAT_COMIC,
    LIMIT_MAX,
    ORDER_BY_ON_SALE_DATE,
    ORDER_BY_START_DATE_DESC,
} from "../constants";
import { useCharacters } from "../hooks";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";

/**
 * Character information page, Receives character data from parent components
 * Character, CharacterGrid and Main and displays it.
 */
const CharacterSingle = ({ character }) => {
    const { id, name, description, thumbnail, comics, events, urls } =
        character;
    const { changeCurrentView } = useCharacters();
    return (
        <div className="character-single grid-figure">
            <ScrollToTopOnMount />
            <Link to="/characters">
                <img
                    onClick={changeCurrentView}
                    src={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
                    alt={name}
                    className="single-photo"
                />
            </Link>
            <h2 className="character-name">{name}</h2>
            <p className="description">
                {description === "" || description === " " ? (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={urls[0].url}
                    >
                        No description listed for this character/group in the
                        Marvel API. Please click to find out more at the
                        official marvel website
                    </a>
                ) : (
                    description
                )}
            </p>
            <br />
            <div className="extras">
                <h2>Comics</h2>
                {comics.available === 0 ? (
                    <h3> Comics have not been listed for this character</h3>
                ) : (
                    <SubGrid
                        uri={`${comics.collectionURI}?${FORMAT_COMIC}&${ORDER_BY_ON_SALE_DATE}&${API_KEY}&limit=${LIMIT_MAX}`}
                        hasSearchBar
                        searchPlaceholder="Comic Name"
                    />
                )}
                <br />
                <h2>Events</h2>
                {events.available === 0 ? (
                    <h3> Events have not been listed for this character</h3>
                ) : (
                    <SubGrid
                        uri={`${events.collectionURI}?${ORDER_BY_START_DATE_DESC}&${API_KEY}`}
                        hasSearchBar
                        searchPlaceholder="Event Name"
                    />
                )}
                <br />
                <br />
                <>
                    {urls
                        .filter((link) => link.type !== "wiki")
                        .map((link, key) => (
                            <div key={key}>
                                <br />
                                <a
                                    key={key}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={link.url}
                                >
                                    <h3 style={{ marginTop: "5px" }}>
                                        {link.type.charAt(0).toUpperCase() +
                                            link.type.slice(1)}
                                    </h3>
                                </a>
                            </div>
                        ))}
                </>
            </div>
        </div>
    );
};

export default CharacterSingle;
