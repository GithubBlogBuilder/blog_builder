describe('Test navbar links', () => {
    beforeEach(()=>{
        cy.visit('/auth/loginlogin');
    })
    it('Test login link', () => {
        cy.visit('/');
        const link = cy.get('#login-link');
        link.click();
        cy.location('pathname').should('eq', '/auth/login');
    });
    it('Test home link', () => {
        const link = cy.get('#home-link');
        link.click();
        cy.location('pathname').should('match', /\/(index)?/);
    });
  })
  
  