import { login, logout } from "./plugin";

describe('Test login page function', () => {
    beforeEach(()=>{
        cy.visit('/login');
    })
    it('Test github auth link', () => {
        cy.visit('/');
        const link = cy.get('#login-link');
        link.click();
        cy.location('host').should('be', 'https://github.com')
        cy.location('pathname').should('be', '/login/oauth/authorize');
        cy.location('search').should(search=>{
            const params = new URLSearchParams(search);
            const redirect_uri = new URL(params.get('redirect_uri') as string);
            expect(redirect_uri.host).to.eq(Cypress.config().baseUrl);
            expect(redirect_uri.pathname).to.eq('/oauth')
        })
    });
    it('Test already login', ()=>{
        login();
        cy.location('pathname').should('not.be', '/login')
        logout();
    })
  })
  
  