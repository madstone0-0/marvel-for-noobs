import React from "react";
import { Button } from "semantic-ui-react";

const NavButtons = ({ next = (f) => f, previous = (f) => f, offset }) => {
    return (
        <div className="nav-buttons">
            {offset === 0 ? (
                <div></div>
            ) : (
                <Button className="ui red large button" onClick={previous}>
                    Previous
                </Button>
            )}

            <Button className="ui red large button" onClick={next}>
                Next
            </Button>
        </div>
    );
};

export default NavButtons;
