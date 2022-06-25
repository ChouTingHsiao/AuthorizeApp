
Cypress.Commands.add('CheckTotalCount', () => {

    cy.get<string>('@previousTotal').then($preText => {
        cy.get<string>('@currentTotal')
        .then(($nowText) => {

            const previousTotal = parseInt($preText.split(' ')[5], 10)

            const nowTotal = parseInt($nowText.split(' ')[5], 10)

            expect(nowTotal).to.be.greaterThan(previousTotal)
        })
    })
})

Cypress.Commands.add('ClickLastButton', () => {

    cy.get('button.mat-paginator-navigation-last').then(($btn) => {
        if ($btn.is(":disabled")) {
            return
        } else {
            cy.wrap($btn).click()
        }
    })
})

Cypress.Commands.add('ClickEditByColumn', (column, value) => {

    cy.get('app-table tbody')
    .find(`tr:not(.detail-row) td.mat-column-${column}`)
    .contains(value)
    .siblings('td.mat-column-maintain')
    .find('button#btnEdit')
    .click()
})

Cypress.Commands.add('CheckColumnValue', (column, value) => {

    cy.get('app-table tbody')
      .find(`tr:not(.detail-row) td.mat-column-${column}`)
      .contains(value)
})

Cypress.Commands.add('ClickDeleteByColumn', (column, value) => {

    cy.get('app-table tbody')
    .find(`tr:not(.detail-row) td.mat-column-${column}`)
    .contains(value)
    .siblings('td.mat-column-maintain')
    .find('button#btnDelete')
    .click()
})
