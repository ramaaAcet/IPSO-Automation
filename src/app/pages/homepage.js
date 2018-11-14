var homepage = function () {

	this.ipsoHeader = element(by.xpath("//h2[contains(@class,'clsIpsoOffshore')]"));
	this.gomLink = element(by.css("a[title='GOM']"));
	this.ghanaLink = element(by.css("a[title='GHANA']"));

	this.homePageDisplayValidation = function () {
		expect(this.ipsoHeader.getText()).toContain("IPSO");
		expect(this.gomLink.getText()).toContain("GOM");
		expect(this.ghanaLink.getText()).toContain("GHANA");
	}
}
module.exports = new homepage();