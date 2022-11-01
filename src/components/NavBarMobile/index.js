import React from "react";
import { Container, Icon, Menu, Sidebar } from "semantic-ui-react";

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
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                items={items}
                vertical
                visible={visible}
            ></Sidebar>
            <Sidebar.Pushable
                dimmed={visible}
                onClick={onPusherClick}
                style={{ minHeight: "100vh" }}
            >
                <Menu className="nav-bar" fixed="top">
                    <div>
                        <button
                            type="button"
                            onClick={toggleDarkTheme}
                            className="dark-button ui red medium button search-button"
                        >
                            Dark Mode
                        </button>
                    </div>
                    <Container>
                        <h1 className="page-header">Marvel for Noobs</h1>
                    </Container>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                </Menu>
                {children}
            </Sidebar.Pushable>
        </Sidebar.Pushable>
    );
};

export default NavBarMobile;
