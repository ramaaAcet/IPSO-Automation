//FieldNames
var gomFields = ["BALDPATE", "BLIND FAITH", "BOOMVANG", "CAESAR TONGA", "CONGER", "CONSTITUTION", "GUNNISON", "HEIDELBERG", "HOLSTEIN", "HORN MOUNTAIN", "LUCIUS", "MARCO POLO", "MARLIN", "NANSEN", "POWER PLAY", "TICONDEROGA"];
var ghanaFields = ["JUBILEE", "TEN"];

var pageLoad = require('../resources/reusablemethods.js');
var commonElem = require('../resources/commonelements.js');


var dailydashboardpage = function () {

	var fieldLink = element.all(by.xpath("//div[@_ngcontent-c7='' and contains(@class,'ng-star-inserted')]"));	
	this.fieldMap = element(by.xpath("//*[@id='svg']/*[local-name() = 'svg']"));
	this.productionWell = element(by.xpath("//*[local-name () = 'svg' and contains(@class,'highcharts-root')]"));
	this.previousEvents = element(by.id("borderLayout_eGridPanel"));

	this.gomFieldList = function () {
		pageLoad.waitForPageToLoad();
		browser.actions().mouseMove(commonElem.headerGomLink).perform();
		fieldLink.count().then(function (fieldCount) {
			for (var i = 0; i < fieldCount; i++) {
				expect(fieldLink.get(i).getText()).toContain(gomFields[i]);
			}
		})
	}

	this.ghanaFieldList = function () {
		pageLoad.waitForPageToLoad();
		expect(commonElem.headerGhanaLink.isDisplayed()).toBeTruthy();
		fieldLink.count().then(function (fieldCount) {
			for (var i = 0; i < fieldCount; i++) {
				expect(fieldLink.get(i).getText()).toContain(ghanaFields[i]);
			}
		})
	}

	this.componentsDisplay = function () {
		expect(commonElem.homeLink.isDisplayed()).toBeTruthy();
		expect(this.fieldMap.isDisplayed()).toBeTruthy();
		expect(commonElem.optionsDropdown.isDisplayed()).toBeTruthy();
		expect(this.productionWell.isDisplayed()).toBeTruthy();
		expect(this.previousEvents.isDisplayed()).toBeTruthy();
		commonElem.quantityAndUnitFilter();
		expect(commonElem.calender.isDisplayed()).toBeTruthy();
		browser.actions().mouseMove(commonElem.dashboardLink).perform();
		expect(commonElem.pinSideBar.isDisplayed()).toBeTruthy();
	}
}
module.exports = new dailydashboardpage();