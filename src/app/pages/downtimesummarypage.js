var downtimesummary = function () {

    this.totalDowntime = element(by.xpath("//*[text()='Total Downtime']/ancestor::div[contains(@class,'star-inserted')][1]"));
    this.totalVariance = element(by.xpath("//*[text()='Variance (Forecast - Actual)']/ancestor::div[contains(@class,'star-inserted')][1]"));

    this.componentsDisplay = function () {
        expect(this.totalDowntime.isDisplayed()).toBeTruthy();
        expect(this.totalVariance.isDisplayed()).toBeTruthy();
    }
}
module.exports = new downtimesummary();