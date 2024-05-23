describe('Test main page', () => {
    beforeEach(()=>{
        cy.visit('/');
    })
    it('Test setup link', () => {
        const link = cy.get('#startup-link');
        link.click();
        cy.location('pathname').should('be', '/deploy');
    });
  })
  
  