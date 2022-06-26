export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(account: string, password: string): void;

            cacheElement(key: string, value: string): Cypress.Chainable<string>;

            CheckTotalCount(previous: string, current: string): void;

            ClickLastButton(): void;

            CheckColumnValue(column: string, value: string, isDetail?: boolean): void;

            ClickButtonByColumn(button: string, column: string, value: string, isDetail?: boolean): void;
        }
    }
}