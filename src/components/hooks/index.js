import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../CharacterProvider";

export const useCharacters = () => useContext(CharacterContext);
