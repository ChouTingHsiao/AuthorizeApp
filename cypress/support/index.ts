export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(account: string, password: string): void;

            cacheElement(key: string, value: string): Cypress.Chainable<string>;

            CheckTotalCount(): void;

            ClickLastButton(): void;

            ClickEditByColumn(column: string, value: string): void;

            CheckColumnValue(column: string, value: string): void;

            ClickDeleteByColumn(column: string, value: string): void;
        }
    }
}