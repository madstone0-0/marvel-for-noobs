import PropTypes from "prop-types";
import React from "react";
import { Container } from "semantic-ui-react";
import NavBarDesktop from "../NavBarDesktop";
import NavBarMobile from "../NavBarMobile";

const NavBarChildren = ({ children }) => (
    <Container className="page page-container" style={{ marginTop: "5em" }}>
        {children}
    </Container>
);

const NavBar = ({
    handlePusher,
    handleToggle,
    Media,
    links,
    toggleDarkTheme,
    visible,
    children,
}) => {
    return (
        <>
            <Media at="mobile">
                <NavBarMobile
                    items={links}
                    onPusherClick={handlePusher}
                    toggleDarkTheme={toggleDarkTheme}
                    onToggle={handleToggle}
                    visible={visible}
                >
                    <NavBarChildren>{children}</NavBarChildren>
                </NavBarMobile>
            </Media>
            <Media greaterThan="mobile">
                <NavBarDesktop
                    items={links}
                    toggleDarkTheme={toggleDarkTheme}
                />
                <Container className="page-container page">
                    {children}
                </Container>
            </Media>
        </>
    );
};

NavBar.propTypes = {
    handlePusher: PropTypes.func,
    handleToggle: PropTypes.func,
    Media: PropTypes.func,
    links: PropTypes.array,
    toggleDarkTheme: PropTypes.func,
    visible: PropTypes.bool,
    children: PropTypes.node,
};

export default NavBar;
