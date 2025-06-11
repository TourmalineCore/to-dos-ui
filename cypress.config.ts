/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:5173`,
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
  },
  env: {
    API_URL: `http://localhost:5005/api/to-dos-api`,
  },
  component: {
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
    // that it quickly fails during the workshop
    defaultCommandTimeout: 500,
  },
})
