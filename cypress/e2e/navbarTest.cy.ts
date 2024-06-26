import { login, logout, pages } from './plugin';

describe('Test navbar links when not login', () => {
    beforeEach(() => {
        logout();
    });
    pages.forEach((page) => {
        it(`Test login link on ${page}`, () => {
            if (page == '/auth/login') return;
            cy.visit(page);
            const link = cy.get('#login-link');
            link.click();
            cy.location('pathname').should('eq', '/auth/login');
        });
        it(`Test home link on ${page}`, () => {
            cy.visit(page);
            const link = cy.get('#home-link');
            link.click();
            cy.location('pathname').should('match', /^\/(landing_page)?$/);
        });
    });
});

describe('Test navbar links when login', () => {
    beforeEach(() => {
        login();
    });
    pages.forEach((page) => {
        it(`Test logout link on ${page}`, () => {
            cy.visit(page);
            cy.get(`div:contains('${Cypress.env('test_user_name')}')`);
            cy.get(`#action_list`).find('button').eq(0).click();
            cy.get('#sign-out-button').click();

            cy.location('pathname').should('eq', '/landing_page');
        });
        it(`Test home link on ${page}`, () => {
            cy.visit(page);
            const link = cy.get('#home-link');
            link.click();
            cy.location('pathname').should('match', /^\/(landing_page)?$/);
        });
    });
});
