import { createMedia } from "@artsy/fresnel";
import axios from "axios";
import classNames from "classnames";
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useState,
} from "react";
import ReactGA from "react-ga";
import { Link, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Cookies from "universal-cookie";

import CharacterGrid from "../CharacterGrid";
import Footer from "../Footer";
import HomePage from "../HomePage";
import Loading from "../Loading";
import NavBar from "../NavBar";
import NavButtons from "../NavButtons";
import { useCharacters } from "../hooks";
import { readFromLocalStore, writeToLocalStore } from "../utils/cache";

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
    const [darkTheme, updateDarkTheme] = useReducer(
        (darkMode) => !darkMode,
        false,
    );
    const [visible, isVisible] = useState(false);

    const {
        isLoading,
        error,
        hasNotSearchedOnce,
        currentView,
        offset,
        characters,
        previous,
        next,
    } = useCharacters();

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
    }, []);

    useLayoutEffect(() => {
        getDarkModeValue();
    }, []);

    useLayoutEffect(() => {
        setDarkModeValue();
    }, [darkTheme]);

    const handlePusher = () => {
        if (visible) isVisible(false);
    };

    const handleToggle = () => isVisible(!visible);

    const setDarkModeValue = () => {
        writeToLocalStore("darkMode", darkTheme);
    };

    const getDarkModeValue = () => {
        if (readFromLocalStore("darkMode")) updateDarkTheme(true);
    };

    const toggleDarkTheme = () => {
        ReactGA.event({
            category: "Page Interactions",
            action: "Enabled dark theme",
        });
        updateDarkTheme();
    };

    return (
        <div
            className={classNames("main", {
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
                                                        <Loading />
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
                                                                <CharacterGrid />
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
                                                <NavButtons
                                                    next={next}
                                                    previous={previous}
                                                    offset={offset}
                                                />
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
