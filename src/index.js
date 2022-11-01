import React from "react";
import { createRoot } from "react-dom/client";
// import "semantic-ui-css/semantic.js";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import css from "./styles/style.css";
import Main from "./components/Main";

const container = document.getElementById("app");
const root = createRoot(container);
const router = (
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);

root.render(router);
