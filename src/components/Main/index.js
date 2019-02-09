import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Link, Route, matchPath } from "react-router-dom";

import {
    API_KEY,
    CHARACTERS,
    LIMIT,
    PATH_BASE,
    PATH_SEARCH_IS,
    PATH_SEARCH_STARTS,
    DEFAULT_QUERY,
} from "../constants";
import CharacterGrid from "../CharacterGrid";
import CharacterSingle from "../CharacterSingle";
import Character from "../Character";

function isSearched(searchCharacter) {
    return function(character) {
        return (
            !searchCharacter ||
            character.name.toLowerCase().includes(searchCharacter.toLowerCase())
        );
    };
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [
                {
                    id: 1009610,
                    name: "Spider-Man",
                    description:
                        "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
                    modified: "2018-06-19T16:39:38-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
                        extension: "jpg",
                    },
                },
                {
                    id: 1009718,
                    name: "Wolverine",
                    description:
                        "Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he's a premiere member of both the X-Men and the Avengers.",
                    modified: "2016-05-02T12:21:44-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf",
                        extension: "jpg",
                    },
                },
                {
                    id: 1009351,
                    name: "Hulk",
                    description:
                        "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.",
                    modified: "2014-06-10T16:12:58-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0",
                        extension: "jpg",
                    },
                },
                {
                    id: 1017577,
                    name: "Ms. Marvel (Kamala Khan)",
                    description:
                        "A Muslim-American teenager growing up in Jersey City, Kamala Khan gained shape-shifting powers when Inhumanity spread over the Earth. A fan of super heroes, in particular Carol Danvers, Kamala took up Captain Marvel's former identity, becoming the new Ms. Marvel. This up and coming hero works to protect her community and understand her place in the world.",
                    modified: "2016-04-29T15:02:56-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/5/b0/548730dac2a40",
                        extension: "jpg",
                    },
                },
                {
                    id: 1009452,
                    name: "Moon Knight",
                    description: "",
                    modified: "2013-08-07T14:00:18-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/3/30/52028af90e516",
                        extension: "jpg",
                    },
                },
                {
                    id: 1010801,
                    name: "Ant-Man (Scott Lang)",
                    description: "",
                    modified: "2016-07-26T10:15:03-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/e/20/52696868356a0",
                        extension: "jpg",
                    },
                },
                {
                    id: 1009608,
                    name: "Spider-Woman (Jessica Drew)",
                    description:
                        "When young Jessica Drew suffered uranium poisoning in 1931, her father was forced to inject her with his untested spider serum and seal her in a genetic accelerator.",
                    modified: "2013-10-21T11:31:27-0400",
                    thumbnail: {
                        path:
                            "http://i.annihil.us/u/prod/marvel/i/mg/b/50/5265479097743",
                        extension: "jpg",
                    },
                },
            ],
            searchCharacter: DEFAULT_QUERY,
            result: null,
            error: null,
        };
    }
    onSearchChange = event => {
        return this.setState({ searchCharacter: event.target.value });
    };

    onSearchSubmit = event => {
        event.preventDefault();
        // Insert code here
    };

    setSearchedCharacter = result => {
        const { results } = result;
        this.setState({ result: results });
    };

    fetchSearchedCharacter = searchCharacter => {
        fetch(
            `${PATH_BASE}${CHARACTERS}?${PATH_SEARCH_STARTS}=${searchCharacter}&${API_KEY}`,
        )
            .then(response => response.json)
            .then(result => this.setSearchedCharacter(result))
            .then(error => this.setState({ error }));
    };

    componentDidMount = () => {
        this.fetchSearchedCharacter(this.state.searchCharacter);
    };

    render() {
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
                                value={this.state.searchCharacter}
                                searchCharacter={this.state.searchCharacter}
                                isSearched={isSearched}
                                characters={this.state.characters}
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
