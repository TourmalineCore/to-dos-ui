import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compareSnapshot(name: string, options?: any): Chainable<Element>,
    }
  }
}
