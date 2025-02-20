import { defineConfig } from "cypress"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:40080`,
  },
  env: {
    API_URL: `http://localhost:40080/api/to-dos-api`,
  }
})
