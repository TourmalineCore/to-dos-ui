import { ToDo } from "../../../../../../api-types";
import { ToDosState } from "../../state/ToDosState";
import { ToDosStateContext } from "../../state/ToDosStateContext";
import { CompleteToDosButton } from "./CompleteToDosButton";

describe(`CompleteToDosButton`, () => {
  describe(`Initialization`, initializationTests);

  describe(`Selection`, selectionTests);
});

function initializationTests() {
  it(`
  GIVEN no ToDos
  WHEN render the component
  AND click the button
  SHOULD see the disabled button
  AND never call the onClick callback
  `, () => {
    mountComponent({
      toDosForInitialization: [],
      onClick: cy.spy().as(`onClickSpy`),
    });

    getButton().should(`be.disabled`);

    getButton().click({
      force: true,
    });

    cy.get(`@onClickSpy`).should(`have.not.been.called`);
  });
}

function selectionTests() {
  it(`
  GIVEN one of two ToDos is selected
  WHEN click on the button
  SHOULD call the onClick callback once
  `, () => {
    mountComponent({
      toDosForInitialization: [
        {
          id: 10,
        },
        {
          id: 11,
        },
      ],
      onClick: cy.spy().as(`onClickSpy`),
    });

    cy.get<ToDosState>(`@toDosState`).then((toDosState) => {
      toDosState.toggleToDoSelection({
        toDoId: 11,
      });
    });

    getButton().should(`not.be.disabled`);

    getButton().click();

    cy.get(`@onClickSpy`).should(`have.been.calledOnce`);
  });
}

function mountComponent({
  toDosForInitialization,
  onClick,
}: {
  toDosForInitialization: unknown[];
  onClick: () => unknown;
}) {
  const toDosState = new ToDosState();

  toDosState.initialize({
    toDos: toDosForInitialization as ToDo[],
  });

  cy.wrap(toDosState).as(`toDosState`);

  cy.mount(
    <ToDosStateContext.Provider value={toDosState}>
      <CompleteToDosButton onClick={onClick} />
    </ToDosStateContext.Provider>,
  );
}

function getButton() {
  return cy.get(`[data-cy=complete-selected-to-dos-button]`);
}
