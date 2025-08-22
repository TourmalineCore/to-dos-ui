describe(`Visual Testing`, () => {
  it(`should be comparing the screenshots of the landing page`, () => {

    //Navigation to google.com url
    cy.visit(`https://www.google.com`)
    //takes the screenshot of current page and compares with baseline screenshot with name google-home-page
    cy.compareSnapshot(`google-home-page`)
  })
})