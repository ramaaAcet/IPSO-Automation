var homepage = function () {

	this.ipsoHeader = element(by.css(".clsIpsoOffshore"));
	this.gomLink = element(by.css(".clsHomePageCard:nth-child(1) figcaption"));
	this.ghanaLink = element(by.css(".clsHomePageCard:nth-child(2) figcaption"));

	this.homePageDisplayValidation = function () {
		expect(this.ipsoHeader.getText()).toContain("IPSO");
		expect(this.gomLink.getText()).toContain("GOM");
		expect(this.ghanaLink.getText()).toContain("GHANA");
	}
}
module.exports = new homepage();