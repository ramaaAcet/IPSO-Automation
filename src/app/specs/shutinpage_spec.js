var shutInObject = require('../tests/pages/ShutInPage.js');
var shutInAnalysisConf = require('../config.json');

describe('Shut In Page Test', function () {
	beforeEach(function () {
		browser.ignoreSynchronization = true;
	}, 5000);


	it('should navigate to shutin page and validate if the event is present', function () {
		browser.get(''+shutInAnalysisConf.gomShutInUrl);
		browser.driver.sleep(10000);
		expect(browser.getTitle()).toContain("IPSO - Shut-in Analysis");
		browser.waitForAngular()
			.then(function () {
				expect(shutInObject.timeFrameSubmitButton.isDisplayed()).toBeTruthy();
				expect(shutInObject.shutInEvent1.isDisplayed()).toBeTruthy();
			});
	}),

		it('should click on any event , check if Calc is displayed and validate if save is enabled after clicking calc', function () {
			browser.waitForAngular()
				.then(function () {
					shutInObject.shutInEvent1.click();
					browser.driver.sleep(6000);
					expect(shutInObject.calcButton.isDisplayed()).toBeTruthy();
					expect(shutInObject.saveButton.isEnabled()).toBeFalsy();
					shutInObject.calcButton.click();
				});
		})
});




















// element.all(shutInObject.zoneSelectDropDown).then(function (selectItem) {
// 	expect(selectItem[0].getText()).toEqual('Select')
// 	selectItem[1].click();
// });
// var fieldStartDate = shutInObject.fieldStartDate.getAttribute('value')
// var eventStartDate = shutInObject.shutInEvent1.getText();
// expect(fieldStartDate).toContain(eventStartDate);