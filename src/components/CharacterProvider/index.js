import axios from "axios";
import React, { createContext, useState } from "react";
import ReactGA from "react-ga";
import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
} from "../constants";
import { readFromCache, writeToCache } from "../utils/cache";
import { getState, saveState } from "../utils/stateSaver";

export const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
    const [characterCount, updateCount] = useState(LIMIT);
    const [prevCharCount, updatePrevCharCount] = useState(0);
    const [offset, updateOffset] = useState(0);
    const [searchCharacter, updateSearchCharacter] = useState("");
    const [characters, updateCharacterArray] = useState([]);
    const [error, updateErrorState] = useState(null);
    const [isLoading, updateLoadingState] = useState(false);
    const [hasNotSearchedOnce, hasSearchedOnce] = useState(true);
    const [currentView, changeView] = useState("grid");

    const characterSearchChange = (e) => {
        return updateSearchCharacter(e.target.value);
    };

    const characterSearchSubmit = (e) => {
        ReactGA.event({
            category: "Page interactions",
            action: "Searched for a character",
        });
        e.preventDefault();
        fetchSearchedCharacter(searchCharacter);
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

        const url = `${PATH_BASE}${CHARACTERS}?${
            PATH_SEARCH_STARTS[0]
        }=${searchCharacter.toLowerCase()}&${API_KEY}&limit=${LIMIT}&offset=${offset}`;

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

    return (
        <CharacterContext.Provider
            value={{
                isLoading,
                error,
                hasNotSearchedOnce,
                currentView,
                offset,
                characters,
                searchCharacter,
                previous,
                next,
                changeCurrentView,
                fetchSearchedCharacter,
                characterSearchChange,
                characterSearchSubmit,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export default CharacterProvider;
