
export function GetPageRange(): Cypress.Chainable<JQuery<HTMLElement>> {

   return cy.get('div.mat-paginator-range-label')
}

export function CheckTotalCount() {
    
    cy.get('div.mat-paginator-range-label')
    .invoke('text')
    .then(($nowText) => {

        console.log($nowText.split(' '));

        const nowTotal = parseInt($nowText.split(' ')[5], 10)

        expect(nowTotal).to.be.greaterThan(0)
    })
}

export function ClickLastButton(): void {

    cy.get('button.mat-paginator-navigation-last').then(($btn) => {
        if ($btn.is(":disabled")) {
            return
        } else {
            cy.wrap($btn).click()
        }
    })
}

export function DeleteLastData(): void {

    cy.get('button.mat-raised-button.mat-button-base.mat-warn').last().click()
}
