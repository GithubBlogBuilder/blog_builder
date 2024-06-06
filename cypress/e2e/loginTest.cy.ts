import { invalid_login, login, logout, pages } from "./plugin";

describe('Test with logout first', () => {
    beforeEach(() => { logout(); })
    it('Test access token', () => {
        cy.setCookie('access_token', Cypress.env('test_access_token'));
        cy.visit('auth/login');
        cy.location('pathname').should('not.be', '/auth/login');
    });
    it('Test oauth back success', () => {
        cy.visit(`/auth/login/callback?code=${Cypress.env('test_oauth_code')}`);
        cy.location('pathname').should('not.be', '/auth/login/callback');
        cy.getCookie('access_token').its('value').should('eq', Cypress.env('test_access_token'));
        cy.get(`#action_list`);
    });
    it('Test oauth back failed', () => {
        cy.visit(`/auth/login/callback?code=${Cypress.env('test_invalid_token')}`);
        cy.location('pathname').should('not.be', '/auth/login/callback');
        cy.location('pathname').should('eq', '/auth/login');
        cy.getCookie('access_token').should('eq', null);
    });
});

describe('Test with login first', () => {
    beforeEach(() => {
        login();
    })
    it('Test logout', () => {
        cy.setCookie('access_token', Cypress.env('test_access_token'));
        cy.visit('/dashboard')
        cy.get(`div:contains('${Cypress.env('test_user_name')}')`)
        cy.get(`#action_list`).find('button').eq(0).click();
        cy.get("div:contains('登出')")
        cy.get("div:contains('登出')").contains(/^登出$/).eq(0).click();
        cy.location('pathname').should('eq', '/')
        cy.getCookie('access_token').should('eq', null);
    });
})

describe('token invalid/expire test', () => {
    beforeEach(() => {
        invalid_login();
    })
    pages.forEach(page => {
        it('test redirect on ' + page, () => {
            cy.location('pathname').should('eq', '/auth/login');
        })
    })
})
