import { useMemo } from "react"
import { ToDosContainer } from "./sections/list/ToDosContainer"
import { ToDosState } from "./sections/list/state/ToDosState"
import { ToDosStateContext } from "./sections/list/state/ToDosStateContext"
import { NewToDoState } from "./sections/new-to-do/state/NewToDoState"
import { NewToDoContainer } from "./sections/new-to-do/NewToDoContainer"
import { NewToDoStateContext } from "./sections/new-to-do/state/NewToDoStateContext"

export function ToDosPage() {
  const newToDoState = useMemo(
    () => new NewToDoState(),
    [],
  )

  const toDosState = useMemo(
    () => new ToDosState(),
    [],
  )

  return (
    <div data-cy="page-to-dos-visual">
      <NewToDoStateContext.Provider value={newToDoState}>
        <ToDosStateContext.Provider value={toDosState}>
          <NewToDoContainer
            onNewToDoAdded={() => toDosState.triggerToDosReload()}
          />
          <ToDosContainer
            onToDosCompleted={() => toDosState.triggerToDosReload()}
          />
        </ToDosStateContext.Provider>
      </NewToDoStateContext.Provider>
    </div>
  )
}
