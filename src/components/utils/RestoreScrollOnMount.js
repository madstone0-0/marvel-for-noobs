import { useEffect } from "react";
import { getState } from "./stateSaver";

const RestoreScrollOnMount = ({ view }) => {
    useEffect(() => {
        if (getState("CharacterGrid") && view === "grid") {
            let { scrollY } = getState("CharacterGrid");
            window.scrollTo(0, scrollY);
        }
    }, [view]);
};

export default RestoreScrollOnMount;
