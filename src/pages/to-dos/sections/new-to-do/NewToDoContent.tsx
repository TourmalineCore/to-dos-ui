import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NewToDoStateContext } from "./state/NewToDoStateContext";

export const NewToDoContent = observer(
  ({ onAddClick }: { onAddClick: () => unknown }) => {
    const newToDoState = useContext(NewToDoStateContext);

    return (
      <>
        <input
          type="text"
          data-cy="new-to-do-name-input"
          onChange={(e) =>
            newToDoState.changeName({
              newName: e.target.value,
            })
          }
        />
        <button
          type="button"
          data-cy="add-new-to-do-button"
          onClick={onAddClick}
        >
          Add
        </button>
      </>
    );
  },
);
