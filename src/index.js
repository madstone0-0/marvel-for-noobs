import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import CharacterProvider from "./components/CharacterProvider";
import Main from "./components/Main";
import css from "./styles/style.css";

const container = document.getElementById("app");
const root = createRoot(container);
const router = (
    <BrowserRouter>
        <CharacterProvider>
            <Main />
        </CharacterProvider>
    </BrowserRouter>
);

root.render(router);
