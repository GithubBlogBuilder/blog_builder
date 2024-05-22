describe('Test repo connection configured at cypress.config.ts', () => {
    beforeEach(()=>{
        cy.visit('/login');
    })
    it('Test github auth link', () => {
        cy.visit('/');
        const link = cy.get('#login-link');
        link.click();
        cy.location('href').should('include', 'github.come');
    });
  })
  
  