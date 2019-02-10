/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Search from "./index";
import renderer from "react-test-renderer";

describe("Search", () => {
    it("renders withput crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Search>Search</Search>, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<Search>Search</Search>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
