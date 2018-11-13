
var shutinpage = function() {

	browser.ignoreSynchronization = true;
    browser.waitForAngular();
	
	this.timeFrameSubmitButton = element(by.id("timeFrameSubmitId"));	
	this.shutInEvent1 = element(by.xpath("//*[@id=\"borderLayout_eGridPanel\"]/div[1]/div/div[4]/div[1]/div/div[1]/div"));
	this.calcButton = element(by.name("calc"));
	this.saveButton = element(by.name("save"));
	this.startDateInField = element(by.id("eventStartDate"));
	this.zoneSelectDropDown = element(by.id("zoneList"));
}
module.exports = new shutinpage();