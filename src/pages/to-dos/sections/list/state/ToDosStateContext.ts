import { createContext } from "react";
import { ToDosState } from "./ToDosState";

export const ToDosStateContext = createContext<ToDosState>(
  null as unknown as ToDosState,
);
