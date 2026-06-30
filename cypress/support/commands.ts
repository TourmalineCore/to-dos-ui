/// <reference types="cypress" />
import compareSnapshotCommand from 'cypress-image-diff-js'

Cypress.on(`uncaught:exception`, () => false)

Cypress.on(`uncaught:exception`, (err) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes(`Request failed with status code`)) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test

  return true
})

Cypress.Commands.add(`getByData`, (selector) => cy.get(`[data-cy=${selector}]`))
Cypress.Screenshot.defaults({
  capture: `viewport`,
  scale: false,
})

compareSnapshotCommand()
