/// <reference types="cypress" />

import { ToDo } from "../../api-types"
import { ToDosState } from "./sections/list/state/ToDosState"
import { ToDosStateContext } from "./sections/list/state/ToDosStateContext"
import { ToDosContainer } from "./sections/list/ToDosContainer"
import { NewToDoContainer } from "./sections/new-to-do/NewToDoContainer"
import { NewToDoState } from "./sections/new-to-do/state/NewToDoState"
import { NewToDoStateContext } from "./sections/new-to-do/state/NewToDoStateContext"

describe(`Page Snapshot test with Cypress`, () => {
  const viewports = [
    {
      width: 768,
      height: 1024,
    },
    {
      width: 1366,
      height: 1024,
    },
  ]

  it(`Take the snapshot of a result`, () => {

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      mountComponent({
        toDosForInitialization: [
          {
            name: `First ToDo`,
          },
          {
            name: `Second ToDo`,
          },
        ],
      })

      cy.get(`[data-cy="page-to-dos-visual"]`)
        .compareSnapshot(`page`)
    })
  })
})

function mountComponent({
  toDosForInitialization,
}: {
  toDosForInitialization: unknown[],
}) {
  const toDosState = new ToDosState()

  toDosState.initialize({
    toDos: toDosForInitialization as ToDo[],
  })

  cy
    .wrap(toDosState)
    .as(`toDosState`)

  const newToDoState = new NewToDoState()

  cy
    .wrap(newToDoState)
    .as(`newToDoState`)

  cy.mount(
    <NewToDoStateContext.Provider value={newToDoState}>
      <ToDosStateContext.Provider value={toDosState}>
        <NewToDoContainer
          onNewToDoAdded={() => { }}
        />
        <ToDosContainer
          onToDosCompleted={() => { }}
        />
      </ToDosStateContext.Provider>
    </NewToDoStateContext.Provider>,
  )
}
