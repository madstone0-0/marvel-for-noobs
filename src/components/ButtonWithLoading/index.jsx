/* eslint-disable indent */
import React from "react";
import { Button } from "semantic-ui-react";
import Loading from "../Loading";

const withLoading =
    (Component) =>
    ({ isLoading, ...rest }) =>
        isLoading ? <Loading /> : <Component {...rest} />;

/**
 * Button Component with builtin loader
 */
const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;
