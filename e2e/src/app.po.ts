import { browser, by, element, protractor } from 'protractor';
import { writeScreenShot } from './utility/imageHelper';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  initPage() {
     const loginTitle = element(by.css('.form-title p')).getText() as Promise<string>;
     expect(loginTitle).toEqual('Auth');
  }

  login() {
    const accountInput = element(by.css('input#Account'));
    accountInput.clear();
    accountInput.sendKeys('ADMIN');
    const passwordInput = element(by.css('input#Password'));
    passwordInput.clear();
    passwordInput.sendKeys('ADMIN');
    element(by.css('input#btn_Login')).click();
    browser.switchTo().alert().accept();
  }

  userPage() {
    const EC = protractor.ExpectedConditions;
    const navigate = element.all(by.css('button.dark-theme.mat-icon-button')).first();
    const isVisible = EC.visibilityOf(navigate);
    browser.wait(isVisible, 5000);
    navigate.click();

    const EC2 = protractor.ExpectedConditions;
    const userButton = element(by.css('a#User'));
    const isVisible2 = EC2.visibilityOf(userButton);
    browser.wait(isVisible2, 5000);
    userButton.click();
  }

  takeScreenshot(imgName: string) {
    browser.takeScreenshot().then(data =>
      writeScreenShot(data, `${imgName}.png`)
    );
  }

}
