/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Main from "./index";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const AppwithRoute = (
    <Router>
        <Main />
    </Router>
);

describe("Main", () => {
    it("renders without crashing", () => {
        shallow(<Main />);
    });

    test("Snapshot", () => {
        const component = renderer.create(AppwithRoute);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
