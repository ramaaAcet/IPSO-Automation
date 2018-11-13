var downTimeSummaryObject = require('../pages/downtimesummarypage.js');
var reuseMethods = require('../resources/reusablemethods.js');
var commonElem = require('../resources/commonelements.js');
var downTimeSummaryConf = require('../resources/config.json');
var dailyDBElement = require('../pages/dailydashboardpage.js');

var pageTitle = downTimeSummaryConf.title.downtimeTitle;
var pageUrl = downTimeSummaryConf.url;
var EC = protractor.ExpectedConditions;

describe('Downtime Summary Test', function () {

    it('should navigate to GOM Downtime Summary page and validate if all the components are displayed', function () {
        browser.get('' + pageUrl.gomDashboardUrl);
        browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
        browser.actions().mouseMove(commonElem.pinSideBar).perform();
        commonElem.downtimeSummaryLink.click();
        browser.waitForAngular()
            .then(function () {
                reuseMethods.waitForPageToLoad();
                expect(browser.getCurrentUrl()).toContain(pageUrl.gomDownTimeSummaryUrl);
                expect(browser.getTitle()).toContain(pageTitle);
                reuseMethods.headerElementsValidation();
                expect(commonElem.chartExportToExcel.count()).toBe(2);
                commonElem.timeFrameFilterDisplay();
                downTimeSummaryObject.componentsDisplay();
            });
    });

    it('should navigate to GHANA Downtime Summary page and validate if all the components are displayed', function () {
        browser.get('' + pageUrl.ghanaDashboardUrl);
        browser.wait(EC.visibilityOf(dailyDBElement.fieldMap), 10000);
        browser.actions().mouseMove(commonElem.pinSideBar).perform();
        commonElem.downtimeSummaryLink.click();
        browser.waitForAngular()
            .then(function () {
                reuseMethods.waitForPageToLoad();
                expect(browser.getCurrentUrl()).toContain(pageUrl.ghanaDownTimeSummaryUrl);
                expect(browser.getTitle()).toContain(pageTitle);
                reuseMethods.headerElementsValidation();
                expect(commonElem.chartExportToExcel.count()).toBe(2);
                commonElem.timeFrameFilterDisplay();
                downTimeSummaryObject.componentsDisplay();
            });
    })
})