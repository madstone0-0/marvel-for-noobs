/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import CharacterGrid from "./index";
import renderer from "react-test-renderer";

describe("CharacterGrid", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<CharacterGrid />, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<CharacterGrid />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
