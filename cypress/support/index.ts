export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(account: string, password: string): void;
        }
    }
}