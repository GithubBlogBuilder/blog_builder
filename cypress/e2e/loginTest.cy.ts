import { invalid_login, pages } from "./plugin";

describe('Test login', () => {
    it('Test access token', ()=>{
        cy.setCookie('access_token', Cypress.env('test_access_token'));
        cy.visit('auth/login');
        cy.location('pathname').should('not.be', '/auth/login');
    })
    it('Test oauth back success', () => {
        cy.visit(`/auth/login/callback?code=${Cypress.env('test_oauth_code')}`);
        cy.location('pathname').should('not.be', '/auth/login/callback');
        cy.getCookie('access_token').its('value').should('eq', Cypress.env('test_access_token'));
        cy.get('#user-name').its('innerHTML').should('eq', Cypress.env('test_user_name'))
    });
    it('Test logout', () => {
        cy.get('#action_list').click();
        cy.get('div[innerHTML="登出"]').click();
        cy.getCookie('access_token').should('eq', null);
    });
    it('Test oauth back failed', () => {
        cy.visit(`/auth/login/callback?code=${Cypress.env('test_failed_code')}`);
        cy.location('pathname').should('not.be', '/auth/login/callback');
        cy.location('pathname').should('eq', '/auth/login');
        cy.getCookie('access_token').should('eq', null);
    });
})

describe('token invalid/expire test', ()=>{
    beforeEach(()=>{
        invalid_login();
    })
    pages.forEach(page=>{
        it('test redirect on ' + page, ()=>{
            cy.location('pathname').should('eq', '/auth/login');
        })
    })
})
  