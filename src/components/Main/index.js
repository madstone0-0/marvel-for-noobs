/* eslint-disable no-console */
import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_STARTS,
} from "../constants";
import CharacterGrid from "../CharacterGrid";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCharacter: "",
            characters: [],
            error: null,
        };
    }
    onSearchChange = event => {
        return this.setState({ searchCharacter: event.target.value });
    };

    onSearchSubmit = event => {
        const { searchCharacter } = this.state;
        // console.log(`Searching for ${searchCharacter}`);
        this.fetchSearchedCharacter(searchCharacter);
        event.preventDefault();
    };

    setSearchedCharacter = result => {
        const results = result.data.results;
        this.setState({ characters: results });
    };

    fetchSearchedCharacter = searchCharacter => {
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
        const { searchCharacter } = this.state;
        this.fetchSearchedCharacter(searchCharacter);
    };

    render() {
        const { searchCharacter, characters } = this.state;
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
                            <CharacterGrid
                                value={searchCharacter}
                                searchCharacter={searchCharacter}
                                characters={characters}
                                onChange={this.onSearchChange}
                                onSubmit={this.onSearchSubmit}
                            />
                        )}
                    />
                </div>
            </Container>
        );
    }
}

export default Main;
