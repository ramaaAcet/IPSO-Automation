
var commonelements = function () {

    //Header
    this.ipsoLink = element(by.linkText("IPSO"));
    this.headerGomLink = element(by.linkText("GOM"));
    this.headerGhanaLink = element(by.linkText("GHANA"));
    this.optionsDropdown = element(by.xpath("//a[@_ngcontent-c3='' and contains(@class,'breadcrumb-item')]/select"));


    //Filter
    this.basisDropdown = element(by.xpath("//chart-param/select[1]"));
    this.streamDropdown = element(by.xpath("//chart-param/select[2]"));
    this.calender = element(by.xpath("//p-calendar"));
    this.oneDayTimeFrame = element(by.linkText("1D"));
    this.oneWeekTimeFrame = element(by.linkText("1W"));
    this.oneMonthTimeFrame = element(by.linkText("1M"));
    this.oneYearTimeFrame = element(by.linkText("1Y"));
    this.fiveYearsTimeFrame = element(by.linkText("5Y"));
    this.totalTimeFrame = element(by.linkText("All"));
    this.startDate = element(by.xpath("(//p-calendar/span[contains(@class,'ui-calendar')]/input)[1]"));
    this.endDate = element(by.xpath("(//p-calendar/span[contains(@class,'ui-calendar')]/input)[1]"));
    this.timeFrameRefresh = element(by.id('timeFrameReset'));
    this.submitButton = element(by.buttonText('Submit'));

    //chartOptions 
    this.chartExportToExcel = element.all(by.css("a[title='Export to Excel']"));
    this.chartMinimize = element(by.css("a[title='Minimize']"));
    this.chartSettings = element(by.css("a[title='Settings']"));
    this.chartMaximize = element.all(by.css("a[title='Fullscreen']"));

    //SideBarInDashboard
    this.homeLink = element(by.linkText("Home"));
    this.dashboardLink = element(by.linkText("Business Unit Dashboard"));
    this.pinSideBar = element(by.xpath("(//*[contains(@class,'clsPinIconIn')])"));
    this.productionSummaryLink = element(by.linkText("Production Summary"));
    this.forecastvsactualproductionLink = element(by.linkText("Forecast vs Actual Production"));
    this.downtimeSummaryLink = element(by.linkText("Downtime Summary"));


    //TimeFrameFilterFunction

    this.timeFrameFilterDisplay = function () {
        expect(this.oneDayTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.oneWeekTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.oneMonthTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.oneYearTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.fiveYearsTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.totalTimeFrame.isDisplayed()).toBeTruthy();
        expect(this.startDate.isDisplayed()).toBeTruthy();
        expect(this.endDate.isDisplayed()).toBeTruthy();
        expect(this.timeFrameRefresh.isDisplayed()).toBeTruthy();
        expect(this.submitButton.isDisplayed()).toBeTruthy();
    }

    //QuantityAndUnitFilterFunctions

    this.quantityAndUnitFilter = function () {
        expect(this.basisDropdown.isDisplayed()).toBeTruthy();
        expect(this.streamDropdown.isDisplayed()).toBeTruthy();
    }


    //chartOptionsFunction

    this.chartOptionsForProductionSummary = function () {
        expect(this.chartExportToExcel.isDisplayed()).toBeTruthy();
        expect(this.chartMinimize.isDisplayed()).toBeTruthy();
        expect(this.chartSettings.isDisplayed()).toBeTruthy();
    }

}
module.exports = new commonelements();