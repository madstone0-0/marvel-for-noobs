import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavBarDesktop = ({ items, toggleDarkTheme }) => (
    <Menu className="nav-bar">
        <>
            <button
                type="button"
                onClick={toggleDarkTheme}
                className="dark-button ui red medium button search-button"
            >
                Dark Mode
            </button>
        </>
        <h1 className="page-header">Marvel for Noobs</h1>
        {items.map((item) => (
            <Menu.Item
                key={item.key}
                className="menu-item header-link nav-button"
            >
                <Link to={item.to}>{item.content}</Link>
            </Menu.Item>
        ))}
    </Menu>
);

NavBarDesktop.propTypes = {
    items: PropTypes.array,
    toggleDarkTheme: PropTypes.func,
};

export default NavBarDesktop;
