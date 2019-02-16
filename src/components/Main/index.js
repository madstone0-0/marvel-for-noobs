/* eslint-disable no-console */
import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
    // TIMESTAMP,
} from "../constants";
import CharacterGrid from "../CharacterGrid";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCharacter: "",
            characters: [],
            error: null,
            isLoading: false,
        };
    }
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
        this.setState({ isLoading: true });
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
    };

    render() {
        const { searchCharacter, characters, error, isLoading } = this.state;
        return (
            <Container>
                <Menu className="nav-bar">
                    <Container>
                        <h1>Marvel for Noobs</h1>
                    </Container>
                </Menu>
                <div>
                    <Route
                        path="/"
                        render={() => (
                            <div>
                                {error ? (
                                    <p>Something went worng</p>
                                ) : (
                                    <div>
                                        {isLoading ? (
                                            <p className="loading-text">
                                                Loading...
                                            </p>
                                        ) : (
                                            <CharacterGrid
                                                value={searchCharacter}
                                                searchCharacter={
                                                    searchCharacter
                                                }
                                                characters={characters}
                                                onChange={this.onSearchChange}
                                                onSubmit={this.onSearchSubmit}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </div>
            </Container>
        );
    }
}

export default Main;
