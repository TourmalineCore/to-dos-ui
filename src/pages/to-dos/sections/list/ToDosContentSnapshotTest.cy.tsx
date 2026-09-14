import { NewToDoState } from "../new-to-do/state/NewToDoState"
import { NewToDoStateContext } from "../new-to-do/state/NewToDoStateContext"
import { ToDosState } from "./state/ToDosState"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { ToDosContent } from "./ToDosContent"

export const VIEWPORTS = [
  {
    width: 343,
    height: 408,
  },
  {
    width: 460,
    height: 408,
  },
]

describe(`ToDosContent Snapshot test`, () => {
  VIEWPORTS.forEach((viewport) => {
    it(`Take the snapshot of ToDosContent ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height)

      mountComponent()

      cy
        .get(`[data-cy="to-dos-content"]`)
        .compareSnapshot(`/${viewport.width}`)
    })
  })
})

function mountComponent() {
  const newToDoStateContext = new NewToDoState()
  const toDosState = new ToDosState()

  toDosState.initialize({
    toDos: [
      {
        id: 1,
        name: `Fifth`,
      },
      {
        id: 2,
        name: `Sixth`,
      },
    ],
  })

  toDosState.toggleToDoSelection({
    toDoId: 2,
  })

  cy
    .mount(

      <NewToDoStateContext.Provider value={newToDoStateContext}>
        <ToDosStateContext.Provider value={toDosState}>
          <ToDosContent onCompleteClick={() => { }} />
        </ToDosStateContext.Provider>
      </NewToDoStateContext.Provider>,
    )
}
