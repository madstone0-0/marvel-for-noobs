import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./styles/style.css";
import Main from "./components/Main";
import Character from "./components/CharacterGrid";

const router = (
    <Router>
        <Route path="/" component={Main} />
    </Router>
);

ReactDOM.render(router, document.getElementById("app"));

module.hot.accept();
