var forecastvsactualObject = require('../pages/forecastvsactualproductionpage.js');
var reuseMethods = require('../resources/reusablemethods.js');
var commonElem = require('../resources/commonelements.js');
var forecastvsActualConf = require('../resources/config.json');
var dailyDBElement = require('../pages/dailydashboardpage.js');

var pageTitle = forecastvsActualConf.title.forecastvsactualTitle;
var pageUrl = forecastvsActualConf.url;
var EC = protractor.ExpectedConditions;

describe('Forecast vs Actual Production Test', function () {
	
	beforeEach(function () {
		browser.ignoreSynchronization = true;
	}, 5000);

	it('should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed', function () {
		browser.get('' + pageUrl.gomDashboardUrl);
		browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
		browser.actions().mouseMove(commonElem.pinSideBar).perform();
		commonElem.forecastvsactualproductionLink.click();
		browser.waitForAngular()
			.then(function () {
				reuseMethods.waitForPageToLoad();
				expect(browser.getCurrentUrl()).toContain(pageUrl.gomForecastvsActualUrl);
				expect(browser.getTitle()).toContain(pageTitle);
				reuseMethods.headerElementsValidation();
				forecastvsactualObject.gomChartDisplay();
			});
	});

	it('should navigate to GHANA Forecast vs Actual production page and validate if all the components are displayed', function () {
		browser.get('' + pageUrl.ghanaDashboardUrl);
		browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
		browser.actions().mouseMove(commonElem.pinSideBar).perform();
		commonElem.forecastvsactualproductionLink.click();
		browser.waitForAngular()
			.then(function () {
				reuseMethods.waitForPageToLoad();
				expect(browser.getCurrentUrl()).toContain(pageUrl.ghanaForecastvsActualUrl);
				expect(browser.getTitle()).toContain(pageTitle);
				reuseMethods.headerElementsValidation();
				forecastvsactualObject.ghanaChartDisplay();
			});
	})
})