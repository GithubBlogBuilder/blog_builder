import { pages } from "./plugin";

describe('Test repo connection configured at cypress.config.ts', () => {
  pages.forEach(page=>{
    it('test connection on '+page, ()=>{
      cy.visit(page);
    })
  })
})

