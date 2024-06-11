import { login, logout } from './plugin';

describe('Test login page function', () => {
    beforeEach(() => {
        logout();
        cy.visit('/auth/login');
    });
    it('Test github auth link', () => {
        cy.get('#github-auth-link').click();
        cy.location('hostname').should('eq', 'https://github.com');
        cy.location('pathname').should('eq', '/auth/login/oauth/authorize');
        cy.location('search').should((search) => {
            const params = new URLSearchParams(search);
            const redirect_uri = new URL(params.get('redirect_uri') as string);
            expect(redirect_uri.host).to.eq(Cypress.config().baseUrl);
            expect(redirect_uri.pathname).to.eq('/auth/callback');
        });
    });
});
