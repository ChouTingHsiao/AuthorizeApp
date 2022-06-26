export {};

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * @dec 輸入帳號與密碼登入
            **/
            login(account: string, password: string): void;

            /**
             * @dec 緩存網頁文字
            **/
            cacheElement(key: string, value: string): Cypress.Chainable<string>;

            /**
             * @dec 檢查前後總數差異
            **/
            CheckTotalCount(previous: string, current: string): void;

            /**
             * @dec 點擊至最後一頁
            **/
            ClickLastButton(): void;

            /**
             * @dec 檢查Column文字
            **/
            CheckColumnValue(column: string, value: string, isDetail?: boolean): void;

            /**
             * @dec 依Column文字搜尋按鈕
            **/
            ClickButtonByColumn(button: string, column: string, value: string, isDetail?: boolean): void;
        }
    }
}