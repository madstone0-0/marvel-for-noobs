import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/style.css";
import Main from "./components/Main";

const router = (
    <Router>
        <Route path="/" component={Main} />
    </Router>
);

ReactDOM.render(router, document.getElementById("app"));

module.hot.accept();
