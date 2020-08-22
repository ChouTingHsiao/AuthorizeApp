import { browser, by, element } from 'protractor';
import { writeScreenShot } from './utility/imageHelper';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  login() {
    const accountInput = element(by.css('input#Account'));
    accountInput.clear();
    accountInput.sendKeys('USER');
    const passwordInput = element(by.css('input#Password'));
    passwordInput.clear();
    passwordInput.sendKeys('USER');
    element(by.css('input#btn_Login')).click();
    browser.switchTo().alert().accept();
  }

  getTitleText() {
    return element(by.css('.form-title p')).getText() as Promise<string>;
  }

  takeScreenshot() {
    browser.takeScreenshot().then(data =>
      writeScreenShot(data, 'AppPage.png')
    );
  }

}
