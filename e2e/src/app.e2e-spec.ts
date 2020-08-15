import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { writeScreenShot } from './utility/imageHelper';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login page', () => {
    page.navigateTo();
    browser.takeScreenshot().then(data =>
      writeScreenShot(data, 'firstPage.png')
    );
    const formTitle = element(by.css('.form-title p')).getText();
    expect(formTitle).toEqual('Auth');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
