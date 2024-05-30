import { login, logout } from "./plugin";

describe('deploy page', () => {
    login();
    cy.visit('/deploy');
    const steps = cy.get('.step');
    const pressComplete = (idx:number)=>{
        const next_btn = cy.get('.next-btn').eq(idx);
        next_btn.click();
        steps.eq(idx).should('have.class', 'complete')
    }
    const testBackFromStep = (idx:number)=>{
        const back_btn = cy.get('.next-btn').eq(idx);
        back_btn.click();
        steps.eq(idx).should('not.have.class', 'complete');
        steps.eq(idx-1).should('have.class', 'complete');
    }
    afterEach(()=>{
        cy.location('pathname').should('be', '/deploy')
    })
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
    });
    it('Test second step', async () => {
        const form = cy.get('form#blog-info');
        form.its('elements').then(elements=>{
            cy.fixture('blog-info.json').then(data=>{
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
    });
    it('Test third step', () => {
        cy.get('#repo-name').invoke('value', 'GithubBlogPortal');
        pressComplete(2);
        steps.eq(2).should('have.class', 'current-step');
    });
    it('Test deploy step', () => {
        
    });
    logout();
  })
  
  