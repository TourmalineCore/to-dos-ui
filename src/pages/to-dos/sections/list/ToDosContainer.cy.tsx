import { ToDosResponse } from "../../../../api-types"
import { ToDosContainer } from "./ToDosContainer"
import { ToDosState } from "./state/ToDosState"
import { ToDosStateContext } from "./state/ToDosStateContext"

describe(`ToDosContainer`, () => {
  beforeEach(() => {
    const toDosResponse: ToDosResponse = {
      toDos: [
        {
          id: 1,
          name: `Un`,
        },
        {
          id: 2,
          name: `Deux`,
        },
        {
          id: 3,
          name: `Eau`,
        },
      ],
    }

    cy.intercept(
      `GET`,
      `*/to-dos`,
      toDosResponse,
    )
  })

  describe(`Initialization`, initializationTests)

  describe(`Selection`, selectionTests)
})

function initializationTests() {
  it(`
  GIVEN two ToDos from network
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent()

    cy.contains(`Deux`)
  })
}

function selectionTests() {
  it(`
  GIVEN two ToDos from network
  WHEN select both of them
  AND click Complete
  SHOULD make complete network call with the ids in the body
  AND there is no selected ids anylonger
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/to-dos/complete`,
        `true`, // because it needs this to be specified and to be string, even if it is not correct by the API contract
      )
      .as(`completeToDosNetworkCall`)

    mountComponent()

    cy
      .contains(`Un`)
      .click()

    cy
      .contains(`Deux`)
      .click()

    cy.get(`[data-cy=complete-selected-to-dos-button]`)
      .click()

    cy.get(`@completeToDosNetworkCall`)
      .its(`request.body`)
      .should(`deep.equal`, {
        toDoIds: [
          1,
          2,
        ],
      })

    cy
      .get<ToDosState>(`@toDosState`)
      .should((toDosState) => {
        expect(toDosState.selectedToDoIds).to.deep.eq([])
      })

    cy.intercept(
      {
        method: `DELETE`,
        url: `*/to-dos*`,
      },
      (req) => {
        console.log(`Intercepted request:`, req)
        expect(req.query).to.have.property(`toDoId`, `3`)
        req.reply()
      })
      .as(`deleteToDosNetworkCall`)

    cy.get(`[name=delete-3]`)
      .click()

    cy.wait(`@deleteToDosNetworkCall`)

    cy.get(`@deleteToDosNetworkCall`)
      .its(`request.query`)
      .should(`have.property`, `toDoId`, 3)

  })
}

function mountComponent() {
  const toDosState = new ToDosState()

  cy
    .wrap(toDosState)
    .as(`toDosState`)

  cy.mount(
    <ToDosStateContext.Provider value={toDosState}>
      <ToDosContainer
        onToDosCompleted={() => { }}
      />
    </ToDosStateContext.Provider>,
  )
}
