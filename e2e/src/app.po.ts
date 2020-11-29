import { browser, by, element, promise } from 'protractor';
import { waitIsVisible, waitIsPresence } from './utility/protractorHelper';

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

    const navigate = element.all(by.css('button.dark-theme.mat-icon-button')).first();
    waitIsVisible(navigate);
    navigate.click();

  }

  userPage() {

    const userButton = element(by.css('a#User'));
    waitIsVisible(userButton);
    userButton.click();

    const prevToatal = element(by.css('.mat-paginator-range-label'));
    waitIsPresence(prevToatal);
    const prevToatalText = prevToatal.getText();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const passwordInput = element(by.css('input[placeholder="password"]'));
    passwordInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisible(dialogAddButton);
    dialogAddButton.click();

    this.checkTotalCount(prevToatalText);

  }

  rolePage() {

    const roleButton = element(by.css('a#Role'));
    waitIsVisible(roleButton);
    roleButton.click();

    const prevToatal = element(by.css('.mat-paginator-range-label'));
    waitIsPresence(prevToatal);
    const prevToatalText = prevToatal.getText();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const passwordInput = element(by.css('input[placeholder="remark"]'));
    passwordInput.sendKeys('TEST');

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisible(dialogAddButton);
    dialogAddButton.click();

    this.checkTotalCount(prevToatalText);

  }

  groupPage() {

    const groupButton = element(by.css('a#Group'));
    waitIsVisible(groupButton);
    groupButton.click();

    const prevToatal = element(by.css('.mat-paginator-range-label'));
    waitIsPresence(prevToatal);
    const prevToatalText = prevToatal.getText();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();
    const dialogTitle = element(by.css('.mat-dialog-title'));

    browser.actions().mouseMove(dialogTitle).click().perform();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisible(dialogAddButton);
    dialogAddButton.click();

    this.checkTotalCount(prevToatalText);

  }

  programPage() {

    const programButton = element(by.css('a#Program'));
    waitIsVisible(programButton);
    programButton.click();

    const prevToatal = element(by.css('.mat-paginator-range-label'));
    waitIsPresence(prevToatal);
    const prevToatalText = prevToatal.getText();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const remarkInput = element(by.css('input[placeholder="remark"]'));
    remarkInput.sendKeys('TEST');

    const linkInput = element(by.css('input[placeholder="linkTag"]'));
    linkInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(1);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisible(dialogAddButton);
    dialogAddButton.click();

    this.checkTotalCount(prevToatalText);

  }

  menuPage() {

    const menuButton = element(by.css('a#Menu'));
    waitIsVisible(menuButton);
    menuButton.click();

    const prevToatal = element(by.css('.mat-paginator-range-label'));
    waitIsPresence(prevToatal);
    const prevToatalText = prevToatal.getText();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisible(addButton);
    addButton.click();

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisible(selectButton);
    selectButton.click();

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();

    const dialogAddButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisible(dialogAddButton);
    dialogAddButton.click();

    this.checkTotalCount(prevToatalText);

  }

  checkTotalCount(prevToatalText: promise.Promise<string>) {

    const nowToatalText = element(by.css('.mat-paginator-range-label')).getText();

    prevToatalText.then((x) => {
      const prevToatal = parseInt( x.split(' ')[4], 10);
      nowToatalText.then((y) => {
        const nowToatal = parseInt( y.split(' ')[4], 10);
        expect(nowToatal).toBe(prevToatal + 1);
      });
    });

  }

}
