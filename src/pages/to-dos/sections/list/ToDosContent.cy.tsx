import { ToDo } from "../../../../api-types"
import { ToDosContent } from "./ToDosContent"
import { ToDosState } from "./state/ToDosState"
import { ToDosStateContext } from "./state/ToDosStateContext"

describe(`ToDosContent`, () => {
  describe(`Initialization`, initializationTests)

  describe(`Selection`, selectionTests)
})

function initializationTests() {
  it(`
  GIVEN two ToDos
  WHEN render the component
  SHOULD see them
  `, () => {
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

    cy.contains(`First ToDo`)
    cy.contains(`Second ToDo`)
    cy.contains(`X`)
    cy.contains(`X`)
  })
}

function selectionTests() {
  it(`
  GIVEN two ToDos
  WHEN click on the 2nd of them
  SHOULD add its id to the list of selected ids
  `, () => {
    mountComponent({
      toDosForInitialization: [
        {
          id: 5,
          name: `Fifth`,
        },
        {
          id: 6,
          name: `Sixth`,
        },
      ],
    })

    cy
      .get(`[data-cy="to-do"]`)
      .contains(`Sixth`)
      .click()

    cy
      .get<ToDosState>(`@toDosState`)
      .should((toDosState) => {
        expect(toDosState.selectedToDoIds).to.contains(6)
      })
  })
}

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
