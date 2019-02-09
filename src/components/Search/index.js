import React from "react";
import { Button, Input } from "semantic-ui-react";

const Search = ({ value, onChange, onSubmit, children }) => (
    <form className="search-bar" onSubmit={onSubmit}>
        <Input type="text" size="large" onChange={onChange} value={value} />
        <Button className="search-button" size="large" color="red">
            {children}
        </Button>
    </form>
);

export default Search;
