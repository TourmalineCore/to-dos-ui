import "./ToDosContent.css"

import { useContext } from "react"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { observer } from "mobx-react-lite"
import { CompleteToDosButton } from "./components/complete-to-dos-button/CompleteToDosButton"

export const ToDosContent = observer(({
  onCompleteClick,
}: {
  onCompleteClick: () => unknown,
}) => {
  const toDosState = useContext(ToDosStateContext)

  return (
    <div
      className="to-dos"
      data-cy="to-dos-content">
      <CompleteToDosButton
        className="to-dos__complete-button"
        onClick={onCompleteClick}
      />
      <ul
        className="to-dos__list"
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
                className="to-dos__item"
                data-cy="to-do"
              >
                <input
                  id={`to-do-${id}-checkbox`}
                  type="checkbox"
                  className="to-dos__input"
                  onChange={() => toDosState.toggleToDoSelection({
                    toDoId: id,
                  })}
                  checked={toDosState.selectedToDoIds.includes(id)}
                />
                <label
                  htmlFor={`to-do-${id}-checkbox`}
                  className="to-dos__label"
                >
                  {name}
                </label>
              </li>
            ))
        }
      </ul>
    </div>
  )
})
