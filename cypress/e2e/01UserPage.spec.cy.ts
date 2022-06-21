import { SignIn } from "../_shared/LoginHelper";
import { GetPageRange, CheckTotalCount, ClickLastButton, DeleteLastData } from "../_shared/TableHelper";

describe('My UserPage Test', () => {  
  it('Should display User page', () => {
    
    cy.visit('/')

    SignIn()

    cy.get('button[aria-label="Menu"]').click()

    cy.get('a#User').click()

    cy.get('button#btnAdd').should("be.visible")

    cy.get('button[aria-label="Menu"]').click()
  })

  it('Should Add Item', () => {
    
    cy.get('button#btnAdd').click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('input[data-placeholder="password"]').type('TEST1')

    cy.get('mat-select[ng-reflect-name="role"]').click()

    cy.get('mat-option').eq(2).click()

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    CheckTotalCount()
  })

  it('Should Edit Item', () => {
    
    ClickLastButton()

    cy.wait(500)

    cy.get('button.mat-raised-button.mat-button-base.mat-accent').last().click()

    const newName = 'TEST2'

    cy.get('input[data-placeholder="name"]').clear().type(newName)

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy
      .get('app-table tbody')
      .find('tr:not(.detail-row)')
      .last()
      .find('.mat-column-name')
      .first()
      .should(($td) => {
        expect($td.text()).to.eq(newName)
      })
  })

  it('Should Delete Item', () => {
    
    DeleteLastData()
  })
})
