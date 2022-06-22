
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

Cypress.Commands.add('CheckLastColumnValue', (column, value) => {

    cy.get('app-table tbody')
      .find('tr:not(.detail-row)')
      .last()
      .find(`.mat-column-${column}`)
      .first()
      .should(($td) => {
        expect($td.text()).to.eq(value)
      })
})

Cypress.Commands.add('DeleteLastData', () => {

    cy.get('button.mat-raised-button.mat-button-base.mat-warn')
    .last()
    .click()
})
