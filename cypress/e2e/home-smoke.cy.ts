describe(`Home Smoke`, () => {
  it(`
  GIVEN Home page
  WHEN click on ToDos page link
  SHOULD navigate there
  `, () => {
    cy.visit(`/`)

    cy
      .get(`[data-cy="to-dos-page-link"]`)
      .click()

    cy.get(`[data-cy="to-dos"]`)
      .should(`exist`)
  })
})
