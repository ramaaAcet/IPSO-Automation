var productionsummary = function () {

    this.chartDisplay = element(By.xpath("//ipso-chart//div[contains(@class,'card-block')]"));

    this.chartDisplayValidation = function () {
        expect(this.chartDisplay.isDisplayed()).toBeTruthy();
    }
}
module.exports = new productionsummary();