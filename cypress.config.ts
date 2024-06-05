import { defineConfig } from "cypress";
console.log(process.env.TEST_ACCESS_TOKEN)
export default defineConfig({
  e2e: {
    baseUrl:'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
