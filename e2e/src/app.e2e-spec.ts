import { AppPage } from './app.po';
import { browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login title', () => {
    page.navigateTo();
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

  it('should display Role page', () => {
    page.rolePage();
    page.takeScreenshot('rolePage');
  });

  it('should display Group page', () => {
    page.groupPage();
    page.takeScreenshot('groupPage');
  });

  it('should display Program page', () => {
    page.programPage();
    page.takeScreenshot('programPage');
  });

  it('should display Menu page', () => {
    page.menuPage();
    page.takeScreenshot('menuPage');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
