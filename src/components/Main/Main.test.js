/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import Main from "./index";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Main", () => {
    it("renders without crashing", () => {
        shallow(<Main />);
    });
});
