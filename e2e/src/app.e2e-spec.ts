import { AppPage } from './app.po';
import { browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display login title', () => {
    page.loginPage();
    page.takeScreenshot('loginPage');
  });

  it('should display Main page', () => {
    page.mainPage();
    page.takeScreenshot('mainPage');
  });

  it('should display User page', () => {
    page.userPage();
    page.takeScreenshot('userPage');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
