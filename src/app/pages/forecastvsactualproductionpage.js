var commonElem = require('../resources/commonelements.js');

//FieldNames
var gomFields = ["BALDPATE", "BLIND-FAITH", "BOOMVANG", "CONGER", "CAESAR-TONGA", "CONSTITUTION","TICONDEROGA","GUNNISON", "HEIDELBERG", "HOLSTEIN", "HORN-MOUNTAIN", "LUCIUS", "MARCO-POLO", "MARLIN", "NANSEN", "POWER-PLAY"];
var ghanaFields = ["JUBILEE", "TEN"];

var forecastvsactualproduction = function () {
    var fieldSpecificChart = element.all(By.xpath("//ipso-chart//div[contains(@class,'card-block')]/parent::div"));

    this.gomChartDisplay = function () {
		browser.actions().mouseMove(commonElem.headerGomLink).perform();
		fieldSpecificChart.count().then(function (fieldCount) {
			for (var i = 0 ; i < fieldCount; i++) {
				expect(fieldSpecificChart.get(i).getText()).toContain(gomFields[i]);
			}
			expect(commonElem.chartMaximize.count()).toBe(fieldSpecificChart.count());
		})
	}

	this.ghanaChartDisplay = function () {
		browser.actions().mouseMove(commonElem.headerGhanaLink).perform();
		fieldSpecificChart.count().then(function (fieldCount) {
			for (var i = 0; i < fieldCount; i++) {
				expect(fieldSpecificChart.get(i).getText()).toContain(ghanaFields[i]);
			}
			expect(commonElem.chartMaximize.count()).toBe(fieldSpecificChart.count());
		})
	}
}
module.exports = new forecastvsactualproduction();