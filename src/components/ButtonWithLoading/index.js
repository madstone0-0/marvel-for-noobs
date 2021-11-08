/* eslint-disable indent */
import { Button } from "semantic-ui-react";
import React from "react";

const withLoading =
    (Component) =>
    ({ isLoading, ...rest }) =>
        isLoading ? "Loading..." : <Component {...rest} />;

/**
 * Button Component with builtin loader
 */
const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;
