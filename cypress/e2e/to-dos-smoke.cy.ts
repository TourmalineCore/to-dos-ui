import { ToDosResponse } from "../../src/api-types";

const E2E_SMOKE_TODO_NAME_PREFIX = `[E2E-SMOKE]`;

describe(`ToDos Smoke`, () => {
  // https://github.com/cypress-io/cypress/issues/25397
  // you cannot call this cleanup before visiting the website because it's making a request to another API
  // for some reason it causes a bug in Cypress that it cannot connect to the website, not yet addressed
  // it was uncommented after adding --host to vite command that now it listens to all interfaces locally according to one of the recommendations in the issue
  beforeEach(`Cleanup`, removeToDos);
  afterEach(`Cleanup`, removeToDos);

  it(`
  GIVEN ToDos page
  WHEN add a new ToDo
  SHOULD see it in the list
  `, () => {
    cy.visit(`/to-dos`);

    const newToDoName = `${E2E_SMOKE_TODO_NAME_PREFIX} ${new Date()}`;

    cy.get(`[data-cy="new-to-do-name-input"]`).type(newToDoName);

    cy.get(`[data-cy="add-new-to-do-button"]`).click();

    cy.get(`[data-cy="to-dos"]`).contains(newToDoName);
  });

  it(`
  GIVEN ToDos page
  WHEN add a new ToDo
  AND select it
  AND click Complete
  SHOULD not see it in the list
  `, () => {
    cy.visit(`/to-dos`);

    const newToDoName = `${E2E_SMOKE_TODO_NAME_PREFIX} ${new Date()}`;

    cy.get(`[data-cy="new-to-do-name-input"]`).type(newToDoName);

    cy.get(`[data-cy="add-new-to-do-button"]`).click();

    cy.contains(newToDoName).click();

    cy.get(`[data-cy=complete-selected-to-dos-button]`).click();

    cy.contains(newToDoName).should(`not.exist`);
  });
});

function removeToDos() {
  cy.request<ToDosResponse>({
    method: `GET`,
    url: `${Cypress.env(`API_URL`)}/to-dos`,
  }).then(({ body }) => {
    const { toDos } = body;

    const toDosToDelete = toDos.filter(({ name }) =>
      name.startsWith(E2E_SMOKE_TODO_NAME_PREFIX),
    );

    toDosToDelete.forEach(({ id }) => {
      cy.request({
        method: `DELETE`,
        url: `${Cypress.env(`API_URL`)}/to-dos?toDoId=${id}`,
      });
    });
  });
}
