import { addPosts, checkPostsDisplay, deployBlog, login, logout, deletePosts, removeBlog, checkBlogInfo } from "./plugin";

describe('Test blog functions', ()=>{
    beforeEach(()=>{ login(); })
    afterEach(()=>{ logout(); })
    it('deployBlog', () => { deployBlog(); });
    it('checkBlogInfo', ()=>{ checkBlogInfo(); });
    it('addPosts', ()=>{ addPosts(); });
    it('checkPostsDisplay', ()=>{ checkPostsDisplay(); });
    it('deletePosts', ()=>{ deletePosts(); });
    it('remove blog', ()=>{ removeBlog(); });
    it('check blog removed', ()=>{
        cy.visit('/dashboard');
        cy.location('pathname').should('be', '/deploy')
    })
})
  