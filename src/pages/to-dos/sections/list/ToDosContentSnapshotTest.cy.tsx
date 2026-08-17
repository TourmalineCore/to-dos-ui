import { NewToDoState } from "../new-to-do/state/NewToDoState"
import { NewToDoStateContext } from "../new-to-do/state/NewToDoStateContext"
import { ToDosState } from "./state/ToDosState"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { ToDosContent } from "./ToDosContent"

export const VIEWPORTS = [
  {
    width: 1024,
    height: 768,
  },
]

describe(`ToDosContent Snapshot test`, () => {
  VIEWPORTS.forEach((viewport) => {
    it(`Take the snapshot of ToDosContent ${viewport.width}x${viewport.height}`, () => {
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
        .getByData(`to-dos-content`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const newToDoStateContext = new NewToDoState()
  const toDosStateContext = new ToDosState()

  cy
    .mount(

      <NewToDoStateContext.Provider value={newToDoStateContext}>
        <ToDosStateContext.Provider value={toDosStateContext}>
          <ToDosContent onCompleteClick={() => { }} />
        </ToDosStateContext.Provider>
      </NewToDoStateContext.Provider>,
    )
}
