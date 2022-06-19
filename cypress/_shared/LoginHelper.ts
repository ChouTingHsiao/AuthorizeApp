
export function SignIn() {

    const accountInput = cy.get('input#Account')

    accountInput.clear()

    accountInput.type('ADMIN')

    const passwordInput = cy.get('input#Password')

    passwordInput.clear()

    passwordInput.type('ADMIN')

    cy.get('input#btn_Login').click()
}
