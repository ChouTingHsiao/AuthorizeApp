import { CheckTotalCount, ClickLastButton, DeleteLastData } from "../_shared/TableHelper";

describe('My GroupPage Test', () => {
  it('Should display Group page', () => {
    
    cy.visit('/')

    cy.login('ADMIN', 'ADMIN')

    cy.get('button[aria-label="Menu"]').click()

    cy.get('a#Group').click()

    cy.get('button#btnAdd').should("be.visible")
  })

  it('Should Add Item', () => {
    
    cy.get('button[aria-label="Menu"]').click()

    cy.get('button#btnAdd').click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('mat-select[ng-reflect-name="roles"]').click()

    cy.get('mat-option').eq(2).click()

    cy.get('body').click()

    cy.cacheElement('previousTotal', 'div.mat-paginator-range-label')

    cy.get('button.mat-button.mat-button-base').eq(0).click()
    cy.wait(500)

    cy.cacheElement('currentTotal', 'div.mat-paginator-range-label')

    CheckTotalCount()
  })

  it('Should Edit Item', () => {

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
