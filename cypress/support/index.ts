export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(account: string, password: string): void;

            cacheElement(key: string, value: string): Cypress.Chainable<string>;
        }
    }
}