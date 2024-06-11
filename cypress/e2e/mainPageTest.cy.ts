import { logout } from "./plugin";

describe('Test main page', () => {
    beforeEach(() => {
        cy.visit('/');
        logout();
    })
    it('Test setup link', () => {
        const link = cy.get('#startup-link');
        link.click();
        cy.location('pathname').should('eq', '/auth/login');
    });
})

