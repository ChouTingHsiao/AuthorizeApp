import { browser, by, element } from 'protractor';
import { writeScreenShot } from './utility/imageHelper';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
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
