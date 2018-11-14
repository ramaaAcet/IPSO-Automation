var homePageObject = require('../pages/homepage.js');
var dailyDBObject = require('../pages/dailydashboardpage.js');
var commonElem = require('../resources/commonelements.js');
var dashboardConf = require('../resources/config.json');

var pageTitle = dashboardConf.title;
var pageUrl = dashboardConf.url;
var EC = protractor.ExpectedConditions;

describe('Navigation to Home Page and GOM/GHANA Daily Dashboard Test', function () {
	
	beforeEach(function () {
		browser.ignoreSynchronization = true;
	}, 5000);

	it('should navigate to homepage and validate if GOM and GHANA are displayed', function () {
		browser.get('');
		browser.wait(EC.visibilityOf(homePageObject.ipsoHeader), 10000);
		expect(browser.getTitle()).toContain(pageTitle.homepageTitle);
		browser.waitForAngular()
			.then(function () {
				expect(commonElem.ipsoLink.isDisplayed()).toBeTruthy();
				homePageObject.homePageDisplayValidation();
			});
	}),

		it('should navigate to GOM Dashboard and check if all the fields and components are displayed', function () {
			homePageObject.gomLink.click();
			dailyDBObject.gomFieldList();
			expect(browser.getCurrentUrl()).toContain(pageUrl.gomDashboardUrl);
			expect(browser.getTitle()).toContain(pageTitle.dashboardTitle);
			dailyDBObject.componentsDisplay();
			expect(commonElem.ipsoLink.isDisplayed()).toBeTruthy();
		})

	it('should navigate to GHANA Dashboard and check if all the fields and components are displayed', function () {
		//clicking on ipso link to navigate back to homepage
		commonElem.ipsoLink.click();
		browser.wait(EC.visibilityOf(homePageObject.ipsoHeader), 10000);
		homePageObject.ghanaLink.click();
		dailyDBObject.ghanaFieldList();
		expect(browser.getCurrentUrl()).toContain(pageUrl.ghanaDashboardUrl);
		expect(browser.getTitle()).toContain(pageTitle.dashboardTitle);
		dailyDBObject.componentsDisplay();
		expect(commonElem.ipsoLink.isDisplayed()).toBeTruthy();
		browser.actions().mouseMove(commonElem.ipsoLink).perform();
	})
})