
import { browser, ElementFinder, protractor } from 'protractor';

function waitIsVisible(htmlElement: ElementFinder) {
    const EC = protractor.ExpectedConditions;
    const isVisible = EC.visibilityOf(htmlElement);
    browser.wait(isVisible, 5000);
}

function waitIsVisibleToClick(htmlElement: ElementFinder) {
    waitIsVisible(htmlElement);
    htmlElement.click();
}

function waitIsPresence(htmlElement: ElementFinder) {
    const EC = protractor.ExpectedConditions;
    const isVisible = EC.presenceOf(htmlElement);
    browser.wait(isVisible, 5000);
}

function waitAlertToClick() {
    browser.wait(() => {
        return browser.switchTo().alert().then(
          (x) => {
            x.accept();
            return true;
          },
          () => {
            return false;
          }
        );
      });
}

export  { waitIsVisible, waitIsVisibleToClick, waitIsPresence, waitAlertToClick };
