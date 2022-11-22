import { createMedia } from "@artsy/fresnel";
import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { Link, Route, Routes } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import Cookies from "universal-cookie";

import CharacterGrid from "../CharacterGrid";
import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
} from "../constants";
import Footer from "../Footer";
import HomePage from "../HomePage";
import NavBar from "../NavBar";
import { readFromCache, writeToCache } from "../utils/cache";
import { getState, saveState } from "../utils/stateSaver";

const AppMedia = createMedia({
    breakpoints: {
        mobile: 320,
        tablet: 768,
        computer: 992,
        largeScreen: 1200,
        widescreen: 1920,
    },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

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
    const [visible, isVisible] = useState(false);

    const cookies = new Cookies();

    const links = [
        { as: Link, content: "Home", key: "home", to: "/" },
        {
            as: Link,
            content: "Characters",
            key: "characters",
            to: "/characters",
        },
    ];

    useEffect(() => {
        ReactGA.initialize("UA-131448417-2");
        ReactGA.pageview(window.location.pathname + window.location.search);
        getDarkModeCookie();
    }, []);

    useEffect(() => {
        setDarkModeCookie();
    }, [darkTheme]);

    const handlePusher = () => {
        if (visible) isVisible(false);
    };

    const handleToggle = () => isVisible(!visible);

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
        const target = e.target.className;
        if (target === "grid-photo") {
            changeView("single");
            saveState("CharacterGrid", { scrollY: window.scrollY });
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
        saveState("CharacterGrid", { scrollY: 0 });
    };

    const previous = () => {
        const currOffset =
            prevCharCount < LIMIT ? offset - prevCharCount : offset - LIMIT;
        fetchSearchedCharacter(searchCharacter, currOffset);
        updateOffset(currOffset);
        saveState("CharacterGrid", { scrollY: 0 });
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
            <style>{mediaStyles}</style>
            <div>
                <MediaContextProvider>
                    <NavBar
                        Media={Media}
                        handlePusher={handlePusher}
                        handleToggle={handleToggle}
                        toggleDarkTheme={toggleDarkTheme}
                        links={links}
                        visible={visible}
                    >
                        <Container>
                            <Routes>
                                <Route
                                    path="characters/*"
                                    element={
                                        <>
                                            {error ? (
                                                <p className="centered">
                                                    Something went wrong
                                                </p>
                                            ) : (
                                                <>
                                                    {isLoading ? (
                                                        <p className="loading-text">
                                                            Loading...
                                                        </p>
                                                    ) : (
                                                        <>
                                                            {characters.length <
                                                                1 &&
                                                            hasNotSearchedOnce ===
                                                                false ? (
                                                                <p className="centered">
                                                                    No results
                                                                    found,
                                                                    please
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
                                                                    currentView={
                                                                        currentView
                                                                    }
                                                                    changeCurrentView={
                                                                        changeCurrentView
                                                                    }
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            {isLoading ||
                                            hasNotSearchedOnce ||
                                            currentView !== "grid" ? (
                                                <></>
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
                                        </>
                                    }
                                />
                                <Route path="/" element={<HomePage />} />
                            </Routes>
                        </Container>
                    </NavBar>
                    <Footer />
                </MediaContextProvider>
            </div>
        </div>
    );
};

export default Main;
