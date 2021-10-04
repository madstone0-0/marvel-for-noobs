/* eslint-disable no-console */
import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import classNames from "classnames";

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
    // TIMESTAMP,
} from "../constants";
import CharacterGrid from "../CharacterGrid";
import HomePage from "../HomePage";
import Footer from "../Footer";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkTheme: false,
            searchCharacter: "",
            characters: [],
            // searchComic: "",
            // comics: [],
            error: null,
            isLoading: false,
            hasNotSearchedOnce: true,
        };
    }

    onSearchChange = (event) => {
        return this.setState({ searchCharacter: event.target.value });
    };

    // onSearchChangeComics = event => {
    //     return this.setState({searchComic: event.target.value});
    // }

    onSearchSubmit = (event) => {
        ReactGA.event({
            category: "Page interactions",
            action: "Searched for a character",
        });
        const { searchCharacter } = this.state;
        // console.log(`Searching for ${searchCharacter}`);
        this.fetchSearchedCharacter(searchCharacter);
        event.preventDefault();
    };

    // onSearchSubmitComic = event => {
    //     ReactGA.event({
    //         category: "Page interactions",
    //         action: "Searched for a comic",
    //     });
    //     const {searchComic} = this.state;

    // }

    setSearchedCharacter = (result) => {
        const results = result.data.results;
        this.setState({ characters: results, isLoading: false });
    };

    // setSearchedComic = result => {
    //     const results = result.data.results;
    //     this.setState({comics: results, isLoading: false});
    // }

    fetchSearchedCharacter = (searchCharacter) => {
        this.setState({ isLoading: true, hasNotSearchedOnce: false });
        axios
            .get(
                `${PATH_BASE}${CHARACTERS}?${PATH_SEARCH_STARTS}=${searchCharacter}&${API_KEY}&limit=${LIMIT}`,
            )
            .then((result) => {
                this.setSearchedCharacter(result.data);
            })
            .catch((error) => {
                this.setState({ error });
            });
    };

    toggleDarkTheme = () => {
        ReactGA.event({
            category: "Page Interactions",
            action: "Enabled dark theme",
        });
        this.setState({ darkTheme: !this.state.darkTheme });
    };

    // fetchSearchedComic = searchComic => {
    //     this.setState({isLoading: true, hasNotSearchedOnce: false});

    // }

    componentDidMount = () => {
        ReactGA.initialize("UA-131448417-2");
        ReactGA.pageview(window.location.pathname + window.location.search);
    };

    render() {
        const {
            searchCharacter,
            characters,
            error,
            isLoading,
            hasNotSearchedOnce,
            darkTheme,
        } = this.state;
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
                                    onClick={this.toggleDarkTheme}
                                    className="dark-button ui red medium button search-button"
                                >
                                    Dark Mode
                                </button>
                            </div>
                            <Container>
                                <h1 className="page-header">
                                    Marvel for Noobs
                                </h1>
                            </Container>
                            <Menu.Item className="menu-item header-link nav-button">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item className="menu-item header-link nav-button">
                                <Link to="/characters">Characters</Link>
                            </Menu.Item>
                        </Menu>
                        <div>
                            <Route
                                path="/characters"
                                render={() => (
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
                                                                    this
                                                                        .onSearchChange
                                                                }
                                                                onSubmit={
                                                                    this
                                                                        .onSearchSubmit
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                            <Route path="/" exact render={() => <HomePage />} />
                        </div>
                        <Footer />
                    </Container>
                </div>
            </div>
        );
    }
}

export default Main;
