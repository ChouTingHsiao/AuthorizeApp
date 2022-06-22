
export function CheckTotalCount() {
    
    cy.get<string>('@previousTotal').then($preText => {
        cy.get<string>('@currentTotal')
        .then(($nowText) => {

            const previousTotal = parseInt($preText.split(' ')[5], 10)

            const nowTotal = parseInt($nowText.split(' ')[5], 10)

            expect(nowTotal).to.be.greaterThan(previousTotal)
        })
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
