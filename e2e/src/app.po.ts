import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { writeScreenShot } from './utility/imageHelper';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  loginPage() {
     const loginTitle = element(by.css('.form-title p')).getText() as Promise<string>;
     expect(loginTitle).toEqual('Auth');
  }

  mainPage() {
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
    const navigate = element.all(by.css('button.dark-theme.mat-icon-button')).first();
    this.waitIsVisible(navigate);
    navigate.click();

    const userButton = element(by.css('a#User'));
    this.waitIsVisible(userButton);
    userButton.click();
  }

  rolePage() {
    const roleButton = element(by.css('a#Role'));
    this.waitIsVisible(roleButton);
    roleButton.click();
  }

  groupPage() {
    const groupButton = element(by.css('a#Group'));
    this.waitIsVisible(groupButton);
    groupButton.click();
  }

  programPage() {
    const programButton = element(by.css('a#Program'));
    this.waitIsVisible(programButton);
    programButton.click();
  }

  menuPage() {
    const menuButton = element(by.css('a#Menu'));
    this.waitIsVisible(menuButton);
    menuButton.click();
  }

  waitIsVisible(htmlElement: ElementFinder) {
    const EC = protractor.ExpectedConditions;
    const isVisible = EC.visibilityOf(htmlElement);
    browser.wait(isVisible, 5000);
  }

  takeScreenshot(imgName: string) {
    browser.takeScreenshot().then(data =>
      writeScreenShot(data, `${imgName}.png`)
    );
  }

}
