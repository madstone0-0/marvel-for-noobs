import { createContext, useContext } from "react";
import { CharacterContext } from "../CharacterProvider";

export const useCharacters = () => useContext(CharacterContext);
