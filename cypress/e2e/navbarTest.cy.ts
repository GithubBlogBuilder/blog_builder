import { login, logout, pages } from "./plugin";

describe('Test navbar links when not login', () => {
    beforeEach(() => {
        logout();
    });
    pages.forEach(page => {
        cy.visit(page);
        it(`Test login link on ${page}`, () => {
            const link = cy.get('#login-link');
            link.click();
            cy.location('pathname').should('eq', '/auth/login');
        });
        it(`Test home link on ${page}`, () => {
            const link = cy.get('#home-link');
            link.click();
            cy.location('pathname').should('match', /\/(index)?/);
        });
    });
})

describe('Test navbar links when login', () => {
    beforeEach(() => {
        login();
    });
    pages.forEach(page => {
        cy.visit(page);
        it(`Test logout link on ${page}`, () => {
            cy.get(`div:contains('${Cypress.env('test_user_name')}')`)
            cy.get(`#action_list`).find('button').eq(0).click();
            cy.get("div:contains('登出')");
            cy.location('pathname').should('eq', '/auth/login');
        });
        it(`Test home link on ${page}`, () => {
            const link = cy.get('#home-link');
            link.click();
            cy.location('pathname').should('match', /\/(index)?/);
        });
    });
})

