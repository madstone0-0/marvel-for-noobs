import PropTypes from "prop-types";
import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

const NavBarMobile = ({
    items,
    visible,
    onPusherClick,
    toggleDarkTheme,
    onToggle,
    children,
}) => {
    return (
        <Sidebar.Pushable>
            <Sidebar
                className="nav-sidebar"
                as={Menu}
                animation="overlay"
                icon="labeled"
                items={items}
                vertical
                visible={visible}
            ></Sidebar>
            <Sidebar.Pushable
                className="link-list"
                dimmed={visible.toString()}
                onClick={onPusherClick}
            >
                <Menu className="nav-bar" fixed="top">
                    <>
                        <button
                            type="button"
                            onClick={toggleDarkTheme}
                            className="dark-button ui red medium button dark-mode-button"
                        >
                            <Icon name="moon" />
                        </button>
                    </>
                    <h1 className="page-header">Marvel for Noobs</h1>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                </Menu>
                {children}
            </Sidebar.Pushable>
        </Sidebar.Pushable>
    );
};

NavBarMobile.propTypes = {
    items: PropTypes.array,
    visible: PropTypes.bool,
    onPusherClick: PropTypes.func,
    toggleDarkTheme: PropTypes.func,
    onToggle: PropTypes.func,
    children: PropTypes.node,
};

export default NavBarMobile;
