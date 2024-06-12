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
    for (let i = 0; i < 4; i++)
        cy.get('button:contains("新增社群媒體")').click();
    (<Cypress.Chainable<JQuery<HTMLFormElement>>>(
        cy.get('#blog-info').eq(0)
    )).then((e) => {
        const elements = e[0].elements;
        cy.fixture('blog-info.json').then((data) => {
            (<HTMLInputElement>elements.namedItem('name')).value = data['name'];
            (<HTMLInputElement>elements.namedItem('title')).value =
                data['title'];
            (<HTMLInputElement>elements.namedItem('intro')).value =
                data['intro'];
            (<HTMLInputElement>(
                elements.namedItem('social-media.0.platform')
            )).value = data['media_type1'];
            (<HTMLInputElement>(
                elements.namedItem('social-media.1.platform')
            )).value = data['media_type2'];
            (<HTMLInputElement>(
                elements.namedItem('social-media.2.platform')
            )).value = data['media_type3'];
            (<HTMLInputElement>(
                elements.namedItem('social-media.3.platform')
            )).value = data['media_type4'];
            (<HTMLInputElement>elements.namedItem('social-media.0.url')).value =
                data['media_link1'];
            (<HTMLInputElement>elements.namedItem('social-media.1.url')).value =
                data['media_link2'];
            (<HTMLInputElement>elements.namedItem('social-media.2.url')).value =
                data['media_link3'];
            (<HTMLInputElement>elements.namedItem('social-media.3.url')).value =
                data['media_link4'];
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
    cy.get('input[name=blogRepoName]').invoke('val', blog_name);
    cy.get('#confirm-delete-btn').click();
    cy.location('pathname').should('eq', 'deploy');
}

export function addPosts() {
    cy.fixture('posts.json').then((data) => {
        cy.visit('/add-post');
        (<Cypress.Chainable<JQuery<HTMLFormElement>>>(
            cy.get('#post-info').eq(0)
        )).then((e) => {
            const elements = e[0].elements;
            data.forEach((post: { [x: string]: any }) => {
                cy.visit('/add-post');
                (<HTMLInputElement>elements.namedItem('name')).value =
                    post['name'];
                (<HTMLInputElement>elements.namedItem('intro')).value =
                    post['intro'];
                (<HTMLInputElement>elements.namedItem('tags')).value =
                    post['tags'];
                (<HTMLInputElement>elements.namedItem('content')).value =
                    post['content'];
                cy.get('#post-info').find('[name="post"]').click();
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
