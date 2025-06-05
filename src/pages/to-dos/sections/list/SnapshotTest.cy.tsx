/// <reference types="cypress" />

import { ToDo } from "../../../../api-types"
import { ToDosState } from "./state/ToDosState"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { ToDosContent } from "./ToDosContent"

describe(`Snapshot test with Cypress`, () => {
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

      cy.get(`[data-cy="to-do"]`)
        .snapshot()

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

  cy.mount(
    <ToDosStateContext.Provider value={toDosState}>
      <ToDosContent
        onCompleteClick={() => { }}
      />
    </ToDosStateContext.Provider>,
  )
}
