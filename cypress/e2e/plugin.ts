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
    const steps = cy.get('.steps');
    const pressComplete = (idx: number) => {
        const next_btn = cy.get('.next-btn').eq(idx);
        next_btn.click();
        steps.eq(idx).should('have.class', 'complete')
    }
    const testBackFromStep = (idx: number) => {
        const back_btn = cy.get('.next-btn').eq(idx);
        back_btn.click();
        steps.eq(idx).should('not.have.class', 'complete');
        steps.eq(idx - 1).should('have.class', 'complete');
    }
    steps.eq(0).should('have.class', 'current-step');
    it('Test first step', () => {
        cy.get('.back-btn').first().should('be.disabled');
        const templates = cy.get('.template');
        templates.eq(0).should('have.class', 'chosen');
        templates.eq(1).should('not.have.class', 'chosen');
        templates.eq(1).click();
        templates.eq(1).should('have.class', 'chosen');
        templates.eq(0).should('not.have.class', 'chosen');
        templates.eq(1).click();
        templates.eq(0).should('have.class', 'chosen');
        templates.eq(1).should('not.have.class', 'chosen');
        pressComplete(0);
        testBackFromStep(1);
        pressComplete(0);
        steps.eq(1).should('have.class', 'current-step');
        cy.location('pathname').should('eq', '/deploy')
    });
    it('Test second step', async () => {
        const form = cy.get('form#blog-info');
        form.its('elements').then(elements => {
            cy.fixture('blog-info.json').then(data => {
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
            })
        })
        pressComplete(1);
        testBackFromStep(2);
        pressComplete(1);
        steps.eq(2).should('have.class', 'current-step');
        cy.location('pathname').should('eq', '/deploy')
    });
    it('Test third step', () => {
        cy.get('#repo-name').invoke('value', 'GithubBlogPortal');
        pressComplete(2);
        steps.eq(2).should('have.class', 'current-step');
        cy.location('pathname').should('eq', '/deploy')
    });
    it('Test deploy step', () => {

    });
}

export function checkBlogInfo() {
    cy.visit('/dashboard');
    cy.get("div:contains('GithubBlogPortal')").eq(0);
}

export function removeBlog() {
    cy.get("button:contains('重新佈署')").click();
    cy.location('pathname').should('eq', 'deploy');
}

export function addPosts() {
    const form = cy.get('#post-info');
    form.its('elements').then(elements => {
        cy.visit('/add-post');
        cy.fixture('posts.json').then(data => {
            data.forEach((post: { [x: string]: any; }) => {
                cy.visit('/add-post')
                elements['name'].value = post['name'];
                elements['intro'].value = post['intro'];
                elements['tags'].value = post['tags'];
                elements['content'].value = post['content'];
                form.find('[name="post"]').click();
                cy.location('pathname').should('be', '/dashboard');
            })
        });
    })
}

export function deletePosts() {
    cy.visit('/dashboard')
    cy.fixture('posts.json').then(data => {
        data.forEach((post: { [x: string]: any; }) => {
            cy.get(`div:contains('${post['name']}')`).find(`*:contains(/^${post['name']}$/)`).eq(0).click();
            cy.location('pathname').should('not.be', '/dashboard');
            cy.get("button:contains('刪除')").eq(0).click();
        })
    });
}

export function checkPostsDisplay() {
    cy.visit('/dashboard')
    cy.fixture('posts.json').then(data => {
        data.forEach((post: { [x: string]: any; }) => {
            cy.get(`div:contains('${post['name']}')`).eq(0);
        })
    });
}

export function checkPostsNotDisplay() {
    cy.visit('/dashboard')
    cy.fixture('posts.json').then(data => {
        data.forEach((post: { [x: string]: any; }) => {
            cy.get('body').should('not.contain.text', post['name']);
        })
    });
}

export const pages: ReadonlyArray<string> = ['/', '/landing_page', '/auth/login', '/deploy', '/dashboard', '/dashboard/add-post', '/dashboard/edit']