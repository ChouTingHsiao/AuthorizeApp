
describe('My UserPage Test', () => {  
  it('Should display User page', () => {
    
    cy.visit('/')

    cy.login('ADMIN', 'ADMIN')

    cy.get('button[aria-label="Menu"]').click()

    cy.get('a#User').click()

    cy.get('button#btnAdd').should("be.visible")
  })

  it('Should Add Item', () => {
    
    cy.get('button[aria-label="Menu"]').click()

    cy.get('button#btnAdd').click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('input[data-placeholder="password"]').type('TEST1')

    cy.get('mat-select[ng-reflect-name="role"]').click()

    cy.get('mat-option').eq(2).click()

    cy.cacheElement('previousTotal', 'div.mat-paginator-range-label')

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.cacheElement('currentTotal', 'div.mat-paginator-range-label')
    
    cy.CheckTotalCount()
  })

  it('Should Edit Item', () => {

    cy.ClickLastButton()

    cy.get('button.mat-raised-button.mat-button-base.mat-accent').last().click()

    const newName = 'TEST2'

    cy.get('input[data-placeholder="name"]').clear().type(newName)

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.CheckColumnValue('name', newName)
  })

  it('Should Delete Item', () => {
    
    cy.DeleteLastData()
  })
})
