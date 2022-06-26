
describe('My RolePage Test', () => {
  it('Should Display Role page', () => {
    
    cy.visit('/')

    cy.login('ADMIN', 'ADMIN')

    cy.get('button[aria-label="Menu"]').click()

    cy.get('a#Role').click()

    cy.get('button#btnAdd').should("be.visible")
  })

  it('Should Add Item', () => {
   
    cy.get('button[aria-label="Menu"]').click()

    cy.get('button#btnAdd').click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('input[data-placeholder="remark"]').type('TEST1')

    cy.cacheElement('previousTotal', 'div.mat-paginator-range-label')

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.cacheElement('currentTotal', 'div.mat-paginator-range-label')

    cy.CheckTotalCount('previousTotal', 'currentTotal')
  })

  it('Should Edit Item', () => {

    cy.ClickLastButton()

    cy.ClickButtonByColumn(`button#btnEdit`, 'name', 'TEST1')

    const newName = 'TEST2'

    cy.get('input[data-placeholder="name"]').clear().type(newName)

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.CheckColumnValue('name', newName)
  })

  it('Should Delete Item', () => {
    
    cy.ClickButtonByColumn('button#btnDelete', 'name', 'TEST2')
  })
})
