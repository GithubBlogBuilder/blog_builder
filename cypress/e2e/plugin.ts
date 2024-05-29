export function login(){
    cy.setCookie('github_access_token', Cypress.env('test_access_token'));
    return;
}

export function logout(){
    cy.clearAllCookies();
    return;
}

export function invalid_login(){
    cy.setCookie('github_access_token', Cypress.env('test_invalid_token'));
    return;
}

export const pages:ReadonlyArray<string> = ['/', '/index', '/login', '/deploy', '/blog', '/add-post', '/edit']