export function login(){
    cy.setCookie('access_token', Cypress.env('test_access_token'));
    return;
}

export function logout(){
    cy.clearAllCookies();
    return;
}

export function invalid_login(){
    cy.setCookie('access_token', Cypress.env('test_invalid_token'));
    return;
}

export const pages:ReadonlyArray<string> = ['/', '/index', '/auth/login', '/deploy', '/dashboard', '/add-post', '/edit']