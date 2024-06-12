const blog_name = 'GithubBlogPortalTestRepo';

export function login() {
    cy.setCookie('access_token', Cypress.env('test_access_token'));
    return;
}

export function logout() {
    cy.clearAllCookies();
    return;
}

export function invalid_login() {
    cy.setCookie('access_token', Cypress.env('test_invalid_token'));
    return;
}

export function deployBlog() {
    cy.visit('/deploy');
    const pressComplete = (idx: number) => {
        const next_btn = cy.get('#next-btn');
        next_btn.click();
        cy.get('.steps').eq(idx).should('have.class', 'complete');
    };

    const testBackFromStep = (idx: number) => {
        const back_btn = cy.get('#back-btn');
        cy.get('.steps').eq(idx).should('not.have.class', 'complete');
        cy.get('.steps')
            .eq(idx - 1)
            .should('have.class', 'complete');
        back_btn.click();
        cy.get('.steps')
            .eq(idx - 1)
            .should('not.have.class', 'complete');
    };
    cy.get('.steps').eq(0).should('have.class', 'current-step');
    // Test first step
    cy.get('.template').eq(0).should('have.class', 'chosen');
    cy.get('.template').eq(1).should('not.have.class', 'chosen');
    cy.get('.template').eq(1).click();
    cy.get('.template').eq(1).should('have.class', 'chosen');
    cy.get('.template').eq(0).should('not.have.class', 'chosen');
    cy.get('.template').eq(0).click();
    cy.get('.template').eq(0).should('have.class', 'chosen');
    cy.get('.template').eq(1).should('not.have.class', 'chosen');
    pressComplete(0);
    testBackFromStep(1);
    pressComplete(0);
    cy.get('.steps').eq(1).should('have.class', 'current-step');
    cy.location('pathname').should('eq', '/deploy');

    // Test second step
    const form = cy.get('form#blog-info');
    form.its('elements').then((elements) => {
        cy.fixture('blog-info.json').then((data) => {
            elements['name'].value = data['name'];
            elements['title'].value = data['name'];
            elements['intro'].value = data['name'];
            elements['social-media-type-1'].value = data['media_type1'];
            elements['social-media-type-2'].value = data['media_type2'];
            elements['social-media-type-3'].value = data['media_type3'];
            elements['social-media-type-4'].value = data['media_type4'];
            elements['social-media-link-1'].value = data['media_link1'];
            elements['social-media-link-2'].value = data['media_link2'];
            elements['social-media-link-3'].value = data['media_link3'];
            elements['social-media-link-4'].value = data['media_link4'];
        });
    });
    pressComplete(1);
    testBackFromStep(2);
    pressComplete(1);
    cy.get('.steps').eq(2).should('have.class', 'current-step');
    cy.location('pathname').should('eq', '/deploy');
    // Test third step
    cy.get('#repo-name').invoke('value', 'GithubBlogPortal');
    pressComplete(2);
    cy.get('.steps').eq(2).should('have.class', 'current-step');
    cy.location('pathname').should('eq', '/deploy');

    // Test deploy step
    cy.get('.complete').should('have.length.at.least', 1);
    cy.get('.complete').should('have.length.at.least', 2);
    cy.get('.complete').should('have.length.at.least', 3);
    cy.get('.complete').should('have.length.at.least', 4);
    cy.get('.complete').should('have.length.at.least', 5);
}

export function checkBlogInfo() {
    cy.visit('/dashboard');
    cy.fixture('blog-info.json').then((data) => {
        cy.get("div:contains('" + blog_name + "')").eq(0);
    });
}

export function removeBlog() {
    cy.get("button:contains('重新佈署')").click();
    cy.get('#confirm-delete-input').invoke('val', blog_name);
    cy.get('#confirm-delete-btn').click();
    cy.location('pathname').should('eq', 'deploy');
}

export function addPosts() {
    cy.fixture('posts.json').then((data) => {
        cy.visit('/add-post');
        const form = cy.get('#post-info');
        form.its('elements').then((elements) => {
            data.forEach((post: { [x: string]: any }) => {
                cy.visit('/add-post');
                elements['name'].value = post['name'];
                elements['intro'].value = post['intro'];
                elements['tags'].value = post['tags'];
                elements['content'].value = post['content'];
                form.find('[name="post"]').click();
                cy.location('pathname').should('be', '/dashboard');
            });
        });
    });
}

export function deletePosts() {
    cy.visit('/dashboard');
    cy.fixture('posts.json').then((data) => {
        data.forEach((post: { [x: string]: any }) => {
            cy.get(`div:contains('${post['name']}')`)
                .find(`*:contains(/^${post['name']}$/)`)
                .eq(0)
                .click();
            cy.location('pathname').should('not.be', '/dashboard');
            cy.get("button:contains('刪除')").eq(0).click();
            cy.get('#confirm-delete-btn').click();
        });
    });
}

export function checkPostsDisplay() {
    cy.visit('/dashboard');
    cy.fixture('posts.json').then((data) => {
        data.forEach((post: { [x: string]: any }) => {
            cy.get(`div:contains('${post['name']}')`).eq(0);
        });
    });
}

export function checkPostsNotDisplay() {
    cy.visit('/dashboard');
    cy.fixture('posts.json').then((data) => {
        data.forEach((post: { [x: string]: any }) => {
            cy.get('body').should('not.contain.text', post['name']);
        });
    });
}

export const pages: ReadonlyArray<string> = [
    '/',
    '/landing_page',
    '/auth/login',
    '/deploy',
    '/dashboard',
    '/dashboard/add-post',
];
