import { AppPage } from './app.po';
import { browser, logging} from 'protractor';
import { takeScreenshot } from './utility/imageHelper';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login page', () => {
    page.navigateTo();
    page.loginPage();
    takeScreenshot('loginPage');
  });

  it('should display Main page', () => {
    page.mainPage();
    takeScreenshot('mainPage');
  });

  it('should display User page', () => {
    page.userPage();
    takeScreenshot('userPage');
  });

  it('should display Role page', () => {
    page.rolePage();
    takeScreenshot('rolePage');
  });

  it('should display Group page', () => {
    page.groupPage();
    takeScreenshot('groupPage');
  });

  it('should display Program page', () => {
    page.programPage();
    takeScreenshot('programPage');
  });

  it('should display Menu page', () => {
    page.menuPage();
    takeScreenshot('menuPage');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
