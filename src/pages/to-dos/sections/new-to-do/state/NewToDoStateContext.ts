import { createContext } from "react";
import { NewToDoState } from "./NewToDoState";

export const NewToDoStateContext = createContext<NewToDoState>(
  null as unknown as NewToDoState,
);
