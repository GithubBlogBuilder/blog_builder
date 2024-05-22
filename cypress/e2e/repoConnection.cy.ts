describe('Test repo connection configured at cypress.config.ts', () => {
  it('Test connection', () => {
    cy.visit('/');
  })
  it('Test main page displayed', () => {
    cy.visit('/');
    cy.visit('/index');
  })
  it('Test login page displayed', () => {
    cy.visit('/login');
  })
  it('Test deploy page displayed', () => {
    cy.visit('/deploy');
  })
  it('Test blog management page displayed', () => {
    cy.visit('/blog');
  })
  it('Test add post page displayed', () => {
    cy.visit('/add-post');
  })
  it('Test edit post page displayed', () => {
    cy.visit('/edit');
  })
})

