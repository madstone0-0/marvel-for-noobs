import React, { useState, useEffect } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import classNames from "classnames";
import Cookies from "universal-cookie";

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
} from "../constants";
import CharacterGrid from "../CharacterGrid";
import HomePage from "../HomePage";
import Footer from "../Footer";
import { element } from "prop-types";

const Main = () => {
    const [darkTheme, updateDarkTheme] = useState(false);
    const [searchCharacter, updateSearchCharacter] = useState("");
    const [characters, updateCharacterArray] = useState([]);
    const [error, updateErrorState] = useState(null);
    const [isLoading, updateLoadingState] = useState(false);
    const [hasNotSearchedOnce, hasSearchedOnce] = useState(true);

    const cookies = new Cookies();
    const searchCharacterCache = new Map();

    useEffect(() => {
        ReactGA.initialize("UA-131448417-2");
        ReactGA.pageview(window.location.pathname + window.location.search);
        getDarkModeCookie();
        // getStoredCharacters();
    }, []);

    useEffect(() => {
        setDarkModeCookie();
    }, [darkTheme]);

    // useEffect(() => {
    //     searchCharacterCache.set(searchCharacter, characters);
    //     window.localStorage.setItem(
    //         searchCharacter.toLocaleLowerCase(),
    //         JSON.stringify(searchCharacterCache.get(searchCharacter)),
    //     );
    // }, [characters]);

    // const getStoredCharacters = () => {
    //     const keys = Object.keys(localStorage);
    //     keys.forEach((key) => {
    //         searchCharacterCache.set(key, Object(localStorage.getItem(key)));
    //     });
    //     console.log(searchCharacterCache);
    // };

    const onSearchChange = (e) => {
        return updateSearchCharacter(e.target.value);
    };

    const onSearchSubmit = (e) => {
        ReactGA.event({
            category: "Page interactions",
            action: "Searched for a character",
        });
        fetchSearchedCharacter(searchCharacter);
        // console.log(searchCharacterCache);
        // if (!searchCharacterCache.has(searchCharacter.toLocaleLowerCase())) {
        //     fetchSearchedCharacter(searchCharacter);
        //     searchCharacterCache.set(
        //         searchCharacter.toLocaleLowerCase(),
        //         characters,
        //     );
        //     console.log(searchCharacterCache);
        //     console.log(searchCharacterCache.size);
        // }
        // updateCharacterArray(
        //     searchCharacterCache.get(searchCharacter.toLocaleLowerCase()),
        // );
        e.preventDefault();
    };

    const fetchSearchedCharacter = (searchCharacter) => {
        updateLoadingState(true);
        hasSearchedOnce(false);
        axios
            .get(
                `${PATH_BASE}${CHARACTERS}?${PATH_SEARCH_STARTS}=${searchCharacter}&${API_KEY}&limit=${LIMIT}`,
            )
            .then((result) => {
                updateCharacterArray(result.data.data.results);
                updateLoadingState(false);
            })
            .catch((error) => {
                updateErrorState(error);
            });
    };

    const setDarkModeCookie = () => {
        cookies.set("darkMode", darkTheme, { path: "/" });
    };

    const getDarkModeCookie = () => {
        const darkMode = cookies.get("darkMode");
        if (darkMode === "true") {
            updateDarkTheme(true);
        }
    };

    const toggleDarkTheme = () => {
        ReactGA.event({
            category: "Page Interactions",
            action: "Enabled dark theme",
        });
        updateDarkTheme(!darkTheme);
    };

    return (
        <div
            className={classNames("", {
                dark: darkTheme === true,
            })}
        >
            <div className="page">
                <Container className="page-container">
                    <Menu className="nav-bar">
                        <div>
                            <button
                                type="button"
                                onClick={toggleDarkTheme}
                                className="dark-button ui red medium button search-button"
                            >
                                Dark Mode
                            </button>
                        </div>
                        <Container>
                            <h1 className="page-header">Marvel for Noobs</h1>
                        </Container>
                        <Menu.Item className="menu-item header-link nav-button">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item className="menu-item header-link nav-button">
                            <Link to="/characters">Characters</Link>
                        </Menu.Item>
                    </Menu>
                    <div>
                        <Routes>
                            <Route
                                path="characters/*"
                                element={
                                    <div>
                                        {error ? (
                                            <p className="centered">
                                                Something went wrong
                                            </p>
                                        ) : (
                                            <div>
                                                {isLoading ? (
                                                    <p className="loading-text">
                                                        Loading...
                                                    </p>
                                                ) : (
                                                    <div>
                                                        {characters.length <
                                                            1 &&
                                                        hasNotSearchedOnce ===
                                                            false ? (
                                                            <p className="centered">
                                                                No results
                                                                found, please
                                                                refresh
                                                            </p>
                                                        ) : (
                                                            <CharacterGrid
                                                                value={
                                                                    searchCharacter
                                                                }
                                                                searchCharacter={
                                                                    searchCharacter
                                                                }
                                                                characters={
                                                                    characters
                                                                }
                                                                onChange={
                                                                    onSearchChange
                                                                }
                                                                onSubmit={
                                                                    onSearchSubmit
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                        <Footer />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Main;
