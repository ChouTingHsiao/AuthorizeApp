
describe('My ProgramPage Test', () => {
  it('Should Display Program page', () => {
    
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

  const detailElement = 'app-table tbody tr.detail-row';

  it('Should Display Detail', () => {

    cy.ClickButtonByColumn('button[aria-label="Detail"]', 'name', 'TEST2')

    cy.get(`${detailElement} button#btnAdd`).should("be.visible")
  })

  it('Should Add Detail', () => {

    cy.get(`${detailElement} button#btnAdd`).click()

    cy.get('input[data-placeholder="name"]').type('TEST1')

    cy.get('input[data-placeholder="remark"]').type('TEST1')

    cy.cacheElement('previousDetailTotal', `${detailElement} div.mat-paginator-range-label`)

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.cacheElement('currentDetailTotal', `${detailElement} div.mat-paginator-range-label`)

    cy.CheckTotalCount('previousDetailTotal', 'currentDetailTotal')
  })

  it('Should Edit Detail', () => {

    cy.ClickButtonByColumn(`button#btnEdit`, 'name', 'TEST1', true)

    const newName = 'TEST2'

    cy.get('input[data-placeholder="name"]').clear().type(newName)

    cy.get('button.mat-button.mat-button-base').eq(0).click()

    cy.wait(500)

    cy.CheckColumnValue('name', newName, true)
  })

  it('Should Delete Detail', () => {
    
    cy.ClickButtonByColumn('button#btnDelete', 'name', 'TEST2', true)
  })

  it('Should Delete Item', () => {
    
    cy.ClickButtonByColumn('button#btnDelete', 'name', 'TEST2')
  })
})
