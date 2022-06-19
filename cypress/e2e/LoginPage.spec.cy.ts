import { SignIn } from "../_shared/LoginHelper";

describe('My First Test', () => {
  it('Should display login page', () => {
    
    cy.visit('/')
   
    cy.get('.form-title p').should(($div) => {

      const loginTitle = $div.text()
    
      expect(loginTitle).to.match(/Auth/)
    })

    SignIn()

    cy.get('span[ng-reflect-router-link="Main"]').should(($div) => {

      const mainTitle = $div.text()
    
      expect(mainTitle).to.match(/Authorize/)
    })
  })
})
