/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Character from "./index";
import renderer from "react-test-renderer";

describe("Character", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Character />, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<Character />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
