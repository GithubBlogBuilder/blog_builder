import { logout } from "./plugin";

describe('Test main page', () => {
    beforeEach(() => {
        cy.visit('/');
        logout();
    })
    it('Test setup link', () => {
        const link = cy.get('a').contains('建立我的個人部落格');
        link.click();
        cy.get('div').contains('請授權 Github 登入');
    });
})

