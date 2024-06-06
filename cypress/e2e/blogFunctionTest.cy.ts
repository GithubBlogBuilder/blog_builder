import { addPosts, checkPostsDisplay, deployBlog, login, logout, deletePosts, removeBlog, checkBlogInfo, checkPostsNotDisplay } from "./plugin";

describe('Test blog functions', () => {
    beforeEach(() => { login(); })
    afterEach(() => { logout(); })
    it('deployBlog', () => { deployBlog(); });
    it('checkBlogInfo', () => { checkBlogInfo(); });
    it('checkPostsNotDisplay', () => { checkPostsNotDisplay(); })
    it('addPosts', () => { addPosts(); });
    it('checkPostsDisplay', () => { checkPostsDisplay(); });
    it('deletePosts', () => { deletePosts(); });
    it('checkPostDeleted', () => { checkPostsNotDisplay(); })
    it('remove blog', () => { removeBlog(); });
    it('check blog removed', () => {
        cy.visit('/dashboard');
        cy.location('pathname').should('be', '/deploy')
    })
})
