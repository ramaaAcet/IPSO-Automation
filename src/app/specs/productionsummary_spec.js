var productionSummaryObject = require('../pages/productionsummarypage.js');
var reuseMethods = require('../resources/reusablemethods.js');
var commonElem = require('../resources/commonelements.js');
var productionSummaryConf = require('../resources/config.json');
var dailyDBElement = require('../pages/dailydashboardpage.js');

var pageTitle = productionSummaryConf.title.productionTitle;
var pageUrl = productionSummaryConf.url;
var EC = protractor.ExpectedConditions;

describe('Production Summary Test', function () {
	
	beforeEach(function () {
		browser.ignoreSynchronization = true;
	}, 5000);

	it('should navigate to GOM production summary page and validate if all the components are displayed', function () {
		browser.get('' + pageUrl.gomDashboardUrl);
		browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
		browser.actions().mouseMove(commonElem.pinSideBar).perform();
		commonElem.productionSummaryLink.click();
		browser.waitForAngular()
			.then(function () {
				reuseMethods.waitForPageToLoad();
				expect(browser.getCurrentUrl()).toContain(pageUrl.gomProductionSummaryUrl);
				expect(browser.getTitle()).toContain(pageTitle);
				reuseMethods.headerElementsValidation();
				expect(commonElem.headerGomLink.isDisplayed()).toBeTruthy();
				commonElem.timeFrameFilterDisplay();
				commonElem.chartOptionsForProductionSummary();
				productionSummaryObject.chartDisplayValidation();
			});
	})

	it('should navigate to GHANA production summary page and validate if all the components are displayed', function () {
		browser.get('' + pageUrl.ghanaDashboardUrl);
		browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
		browser.actions().mouseMove(commonElem.pinSideBar).perform();
		commonElem.productionSummaryLink.click();
		browser.waitForAngular()
			.then(function () {
				reuseMethods.waitForPageToLoad();
				expect(browser.getCurrentUrl()).toContain(pageUrl.ghanaProductionSummaryUrl);
				expect(browser.getTitle()).toContain(pageTitle);
				reuseMethods.headerElementsValidation();
				expect(commonElem.headerGhanaLink.isDisplayed()).toBeTruthy();
				commonElem.timeFrameFilterDisplay();
				commonElem.chartOptionsForProductionSummary();
				productionSummaryObject.chartDisplayValidation();
			});
	})
})