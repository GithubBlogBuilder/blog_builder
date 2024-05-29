import { invalid_login, pages } from "./plugin";

describe('Test login', () => {
    it('Test oauth back success', () => {
        cy.visit(`/oauth?code=${Cypress.env('test_oauth_code')}`);
        cy.location('pathname').should('not.be', '/oauth');
        cy.getCookie('github_access_token').should('be', Cypress.env('test_access_token'));
        cy.get('#user-name').invoke('innerHTML').should('be', Cypress.env('test_user_name'))
    });
    it('Test oauth back failed', () => {
        cy.visit(`/oauth?code=${Cypress.env('test_failed_code')}`);
        cy.location('pathname').should('be', '/login');
        cy.getCookie('github_access_token').should('be', null);
    });
})

describe('token invalid/expire test', ()=>{
    beforeEach(()=>{
        invalid_login();
    })
    pages.forEach(page=>{
        it('test redirect on ' + page, ()=>{
            cy.location('pathname').should('be', '/login');
        })
    })
})
  