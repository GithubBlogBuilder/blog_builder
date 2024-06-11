import { logout } from "./plugin";

describe('Test login page function', () => {
    beforeEach(() => {
        logout();
        cy.visit('/auth/login');
    })
    it('Test github auth link', () => {
        const link = cy.get('#github-auth-link');
        link.click();
        cy.origin('https://github.com', ()=>{
            cy.location('pathname').should('eq', '/login');
        })
    });
})

