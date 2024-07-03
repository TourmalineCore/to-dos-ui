import { useContext } from "react"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { observer } from "mobx-react-lite"
import { CompleteToDosButton } from "./components/complete-to-dos-button/CompleteToDosButton"

export const ToDosContent = observer(({
  onCompleteClick,
  onDeleteClick,
}: {
  onCompleteClick: () => unknown,
  onDeleteClick: (toDoId: number) => unknown,
}) => {
  const toDosState = useContext(ToDosStateContext)

  return (
    <>
      <CompleteToDosButton
        onClick={onCompleteClick}
      />
      <ul
        data-cy="to-dos"
      >
        {
          toDosState
            .toDos
            .map(({
              id,
              name,
            }) => (
              <li
                key={`to-do-${id}`}
                data-cy="to-do"
              >
                <input
                  id={`to-do-${id}-checkbox`}
                  type="checkbox"
                  onChange={() => toDosState.toggleToDoSelection({
                    toDoId: id,
                  })}
                  checked={toDosState.selectedToDoIds.includes(id)}
                />
                <label
                  htmlFor={`to-do-${id}-checkbox`}
                >
                  {name}
                </label>
                <button name={`delete-${id}`}
                  onClick={() => onDeleteClick(id)}>X</button>
              </li>
            ))
        }
      </ul>
    </>
  )
})
