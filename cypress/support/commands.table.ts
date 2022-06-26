
Cypress.Commands.add('CheckTotalCount', (previous, current) => {

    cy.get<string>(`@${previous}`).then($preText => {
        cy.get<string>(`@${current}`)
        .then(($nowText) => {

            let previousTotal = 0;

            if ($preText.length > 8) {
                previousTotal = parseInt($preText.split(' ')[5], 10)
            }

            let nowTotal = 0;

            if ($nowText.length > 8) {
                nowTotal = parseInt($nowText.split(' ')[5], 10)
            }

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

Cypress.Commands.add('CheckColumnValue', (column, value, isDetail = false) => {

    let defaultSelector = ':not(.detail-row)'

    if(isDetail)
    {
        defaultSelector = '.detail-row'
    }

    cy.get('app-table tbody')
      .find(`tr${defaultSelector} td.mat-column-${column}`)
      .contains(value)
})

Cypress.Commands.add('ClickButtonByColumn', (button, column, value, isDetail = false) => {

    let defaultSelector = ':not(.detail-row)'

    if(isDetail)
    {
        defaultSelector = '.detail-row'
    }

    cy.get('app-table tbody')
    .find(`tr${defaultSelector} td.mat-column-${column}`)
    .contains(value)
    .siblings('td.mat-column-maintain')
    .find(button)
    .click()
})
