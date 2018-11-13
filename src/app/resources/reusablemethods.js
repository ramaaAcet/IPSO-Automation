var commonConf = require('../resources/config.json');
var commonElem = require('../resources/commonelements.js');
var dailyDBElement = require('../pages/dailydashboardpage.js');
var EC = protractor.ExpectedConditions;

var reusablemethods = function () {

	this.waitForPageToLoad = function () {
		browser.sleep(5000);
        browser.waitForAngular();
    };

    this.navigateToGomDashboard = function(){
        //browser.get(''+commonConf.url.gomDashboardUrl);
        browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
        browser.actions().mouseMove(commonElem.pinSideBar).perform();        
    };

    this.navigateToGhanaDashboard = function(){
        browser.get(''+commonConf.url.ghanaDashboardUrl);
        browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
        browser.actions().mouseMove(commonElem.pinSideBar).perform();
    };

    this.headerElementsValidation = function () {
        expect(commonElem.ipsoLink.isDisplayed()).toBeTruthy();
		expect(commonElem.optionsDropdown.isDisplayed()).toBeTruthy();
		commonElem.quantityAndUnitFilter();
    };
}
module.exports = new reusablemethods();