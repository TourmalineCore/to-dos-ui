import { Card } from "./Card"

export const VIEWPORTS = [
  {
    width: 1024,
    height: 768,
  },
]

describe(`Card Snapshot test`, () => {
  VIEWPORTS.forEach((viewport) => {
    it(`Take the snapshot of card ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height)

      cy.wrap(
        Cypress.automation(`remote:debugger:protocol`, {
          command: `Emulation.setDeviceMetricsOverride`,
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }),
      )

      mountComponent()

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`card`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  cy
    .mount(
      <Card />,
    )
}
