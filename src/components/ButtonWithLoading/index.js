import { Button } from "semantic-ui-react";
import React from "react";

const withLoading = Component => ({ isLoading, ...rest }) =>
    isLoading ? "Loading..." : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;
