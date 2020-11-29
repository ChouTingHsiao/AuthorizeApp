
import { browser, ElementFinder, protractor } from 'protractor';

function waitIsVisible(htmlElement: ElementFinder) {
    const EC = protractor.ExpectedConditions;
    const isVisible = EC.visibilityOf(htmlElement);
    browser.wait(isVisible, 5000);
}

function waitIsPresence(htmlElement: ElementFinder) {
    const EC = protractor.ExpectedConditions;
    const isVisible = EC.presenceOf(htmlElement);
    browser.wait(isVisible, 5000);
}

export  { waitIsVisible, waitIsPresence };
