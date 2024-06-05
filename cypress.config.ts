import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:'http://localhost:3000',
    env:{
      test_access_token: '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',
      test_oauth_code: 'super_safe_test_code',
      test_failed_code: 'failed_oauth_code',
      test_user_name: 'quan0715'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
