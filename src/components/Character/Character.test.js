/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Character from "./index";
import renderer from "react-test-renderer";

const character = [
    {
        id: 1009610,
        name: "Spider-Man",
        description:
            "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        modified: "2018-06-19T16:39:38-0400",
        thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
            extension: "jpg",
        },
    },
];

describe("Character", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Character character={character} />, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<Character character={character} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
