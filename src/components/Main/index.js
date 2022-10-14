import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useLayoutEffect,
} from "react";
import { Button, Container, Menu } from "semantic-ui-react";
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
    OFFSET,
} from "../constants";
import CharacterGrid from "../CharacterGrid";
import HomePage from "../HomePage";
import Footer from "../Footer";
import { element } from "prop-types";
import { readFromCache, writeToCache } from "../utils/cache";

const Main = () => {
    const [characterCount, updateCount] = useState(LIMIT);
    const [prevCharCount, updatePrevCharCount] = useState(0);
    const [offset, updateOffset] = useState(0);
    const [darkTheme, updateDarkTheme] = useState(false);
    const [searchCharacter, updateSearchCharacter] = useState("");
    const [characters, updateCharacterArray] = useState([]);
    const [error, updateErrorState] = useState(null);
    const [isLoading, updateLoadingState] = useState(false);
    const [hasNotSearchedOnce, hasSearchedOnce] = useState(true);
    const [currentView, changeView] = useState("grid");

    const cookies = new Cookies();

    useEffect(() => {
        ReactGA.initialize("UA-131448417-2");
        ReactGA.pageview(window.location.pathname + window.location.search);
        getDarkModeCookie();
    }, []);

    useEffect(() => {
        setDarkModeCookie();
    }, [darkTheme]);

    const onSearchChange = (e) => {
        return updateSearchCharacter(e.target.value);
    };

    const onSearchSubmit = (e) => {
        ReactGA.event({
            category: "Page interactions",
            action: "Searched for a character",
        });
        fetchSearchedCharacter(searchCharacter);
        e.preventDefault();
    };

    const setCharacter = (result) => {
        updateCount(result.data.data.count);
        updateCharacterArray(result.data.data.results);
    };

    const getFreshData = (url, cacheResponse) => {
        axios
            .get(url)
            .then((result) => {
                setCharacter(result);
                cacheResponse && writeToCache(url, result);
                updateLoadingState(false);
            })
            .catch((error) => {
                updateErrorState(error);
            });
    };

    const getCacheData = (searchCharacter) => readFromCache(searchCharacter);

    const fetchSearchedCharacter = (
        searchCharacter,
        offset = 0,
        cacheResponse = false,
    ) => {
        updateLoadingState(true);
        hasSearchedOnce(false);
        updateOffset(offset);

        const url = `${PATH_BASE}${CHARACTERS}?${PATH_SEARCH_STARTS}=${searchCharacter.toLowerCase()}&${API_KEY}&limit=${LIMIT}&offset=${offset}`;

        if (getCacheData(searchCharacter) !== null) {
            cacheResponse = true;
            setCharacter(readFromCache(url));
            updateLoadingState(false);
        } else {
            getFreshData(url, true);
        }
    };

    const changeCurrentView = (e) => {
        console.log(e.target);
        const target = e.target.className;
        if (target === "grid-photo") {
            changeView("single");
        } else {
            changeView("grid");
        }
    };

    const next = () => {
        const currOffset =
            characterCount < LIMIT ? offset + characterCount : offset + LIMIT;
        updatePrevCharCount(characterCount);
        fetchSearchedCharacter(searchCharacter, currOffset);
        updateOffset(currOffset);
    };

    const previous = () => {
        const currOffset =
            prevCharCount < LIMIT ? offset - prevCharCount : offset - LIMIT;
        fetchSearchedCharacter(searchCharacter, currOffset);
        updateOffset(currOffset);
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
                                                            <div>
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
                                                                    currentView={
                                                                        currentView
                                                                    }
                                                                    changeCurrentView={
                                                                        changeCurrentView
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {isLoading ||
                                        hasNotSearchedOnce ||
                                        currentView !== "grid" ? (
                                            <div></div>
                                        ) : (
                                            <div className="nav-buttons">
                                                {offset === 0 ? (
                                                    <div></div>
                                                ) : (
                                                    <Button
                                                        className="ui red large button"
                                                        onClick={previous}
                                                    >
                                                        Previous
                                                    </Button>
                                                )}

                                                <Button
                                                    className="ui red large button"
                                                    onClick={next}
                                                >
                                                    Next
                                                </Button>
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
