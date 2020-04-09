/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import HomePage from "./index";
import renderer from "react-test-renderer";

describe("HomePage", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<HomePage />, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<HomePage />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
