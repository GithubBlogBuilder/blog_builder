import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:'http://localhost:3000',
    env:{
      test_access_token: process.env.TEST_ACCESS_TOKEN,
      test_oauth_code: 'super_safe_test_code',
      test_failed_code: 'failed_oauth_code',
      test_user_name: 'Cutiemango'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
