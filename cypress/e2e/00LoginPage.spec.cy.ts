
describe('My LoginPage Test', () => {
  it('Should display login page', () => {
    
    cy.visit('/')
   
    cy.get('.form-title p').should(($div) => {

      const loginTitle = $div.text()
    
      expect(loginTitle).to.match(/Auth/)
    })

    cy.login('ADMIN', 'ADMIN')

    cy.get('span[ng-reflect-router-link="Main"]').should(($div) => {

      const mainTitle = $div.text()
    
      expect(mainTitle).to.match(/Authorize/)
    })
  })
})
