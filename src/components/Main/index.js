/* eslint-disable no-console */
import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import { notification, Icon } from "antd";
import LogRocket from 'logrocket';

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
    // TIMESTAMP,
} from "../constants";
import CharacterGrid from "../CharacterGrid";
import ComicGrid from "../ComicGrid";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCharacter: "",
            characters: [],
            error: null,
            isLoading: false,
            hasNotSearchedOnce: true,
        };

        this.welcome();
    }

    welcome = () => {
        notification.open({
            message: "Welcome to Marvel for Noobs",
            description:
                "I'm guessing your a noob, lets start by searching for a character, To go back to the homepage just click the charactar potrait",
            placement: "topRight",
            duration: 5,
            icon: <Icon type="smile" style={{ color: "#b71c1c" }} />,
        });
    };

    onSearchChange = event => {
        return this.setState({ searchCharacter: event.target.value });
    };

    onSearchSubmit = event => {
        ReactGA.event({
            category: "Page interactions",
            action: "Searched for a character",
        });
        const { searchCharacter } = this.state;
        // console.log(`Searching for ${searchCharacter}`);
        this.fetchSearchedCharacter(searchCharacter);
        event.preventDefault();
    };

    setSearchedCharacter = result => {
        const results = result.data.results;
        this.setState({ characters: results, isLoading: false });
    };

    fetchSearchedCharacter = searchCharacter => {
        this.setState({ isLoading: true, hasNotSearchedOnce: false });
        axios
            .get(
                `${PATH_BASE}${CHARACTERS}?${PATH_SEARCH_STARTS}=${searchCharacter}&${API_KEY}&limit=${LIMIT}`,
            )
            .then(result => {
                this.setSearchedCharacter(result.data);
            })
            .catch(error => {
                this.setState({ error });
            });
    };

    componentDidMount = () => {
        ReactGA.initialize("UA-131448417-2");
        ReactGA.pageview(window.location.pathname + window.location.search);
        LogRocket.init('uxtmk4/marvel-for-noobs');
    };

    render() {
        const {
            searchCharacter,
            characters,
            error,
            isLoading,
            hasNotSearchedOnce,
        } = this.state;
        return (
            <Container>
                <Menu className="nav-bar">
                    <Container>
                        <h1>Marvel for Noobs</h1>
                    </Container>
                    <Menu.Item>
                        <Link to="/comics">Comics</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/">Characters</Link>
                    </Menu.Item>
                </Menu>
                <div>
                    <Route
                        path="/"
                        render={() => (
                            <div>
                                {error ? (
                                    <p className="centered">
                                        Something went worng
                                    </p>
                                ) : (
                                    <div>
                                        {isLoading ? (
                                            <p className="loading-text">
                                                Loading...
                                            </p>
                                        ) : (
                                            <div>
                                                {characters.length < 1 &&
                                                hasNotSearchedOnce === false ? (
                                                        <p className="centered">
                                                        No results found, please
                                                        refresh
                                                        </p>
                                                    ) : (
                                                        <CharacterGrid
                                                            value={searchCharacter}
                                                            searchCharacter={
                                                                searchCharacter
                                                            }
                                                            characters={characters}
                                                            onChange={
                                                                this.onSearchChange
                                                            }
                                                            onSubmit={
                                                                this.onSearchSubmit
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
                    <div>
                        <Route
                            path="/comics"
                            render={() => (
                                <ComicGrid />
                            )}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default Main;
