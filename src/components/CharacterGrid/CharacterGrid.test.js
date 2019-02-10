/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import CharacterGrid from "./index";
import renderer from "react-test-renderer";

const props = {
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
    ],
};

describe("CharacterGrid", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<CharacterGrid {...props} />, div);
    });

    test("Snapshot", () => {
        const component = renderer.create(<CharacterGrid {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
