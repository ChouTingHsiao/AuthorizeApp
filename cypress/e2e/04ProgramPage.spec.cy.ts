import { GetPageRange, CheckTotalCount, ClickLastButton, DeleteLastData } from "../_shared/TableHelper";

describe('My ProgramPage Test', () => {
  it('Should display Program page', () => {
    
    cy.visit('/')

    cy.login('ADMIN', 'ADMIN')

    cy.get('button[aria-label="Menu"]').click()

    cy.get('a#Program').click()

    cy.get('button#btnAdd').should("be.visible")
  })

  it('Should Add Item', () => {

    cy.get('button[aria-label="Menu"]').click()

    cy.get('button#btnAdd').click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('input[data-placeholder="remark"]').type('TEST1')

    cy.get('input[data-placeholder="linkTag"]').type('TEST1')

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    CheckTotalCount()
  })

  it('Should Edit Item', () => {

    cy.wait(500)

    ClickLastButton()

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
