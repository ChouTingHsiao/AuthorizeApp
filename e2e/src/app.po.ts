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

    const navigate = element.all(by.css('button.dark-theme.mat-icon-button')).first();
    this.waitIsVisible(navigate);
    navigate.click();
  }

  userPage() {
    const userButton = element(by.css('a#User'));
    this.waitIsVisible(userButton);
    userButton.click();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    this.waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const passwordInput = element(by.css('input[placeholder="password"]'));
    passwordInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    this.waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    this.waitIsVisible(dialogAddButton);
    dialogAddButton.click();
  }

  rolePage() {
    const roleButton = element(by.css('a#Role'));
    this.waitIsVisible(roleButton);
    roleButton.click();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    this.waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const passwordInput = element(by.css('input[placeholder="remark"]'));
    passwordInput.sendKeys('TEST');

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    this.waitIsVisible(dialogAddButton);
    dialogAddButton.click();
  }

  groupPage() {
    const groupButton = element(by.css('a#Group'));
    this.waitIsVisible(groupButton);
    groupButton.click();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    this.waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    this.waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();
    const dialogTitle = element(by.css('.mat-dialog-title'));

    browser.actions().mouseMove(dialogTitle).click().perform();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    this.waitIsVisible(dialogAddButton);
    dialogAddButton.click();
  }

  programPage() {
    const programButton = element(by.css('a#Program'));
    this.waitIsVisible(programButton);
    programButton.click();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    this.waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const remarkInput = element(by.css('input[placeholder="remark"]'));
    remarkInput.sendKeys('TEST');

    const linkInput = element(by.css('input[placeholder="link"]'));
    linkInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    this.waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(1);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    this.waitIsVisible(dialogAddButton);
    dialogAddButton.click();
  }

  menuPage() {
    const menuButton = element(by.css('a#Menu'));
    this.waitIsVisible(menuButton);
    menuButton.click();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    this.waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    this.waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    this.waitIsVisible(dialogAddButton);
    dialogAddButton.click();
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
