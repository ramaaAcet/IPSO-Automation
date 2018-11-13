var HtmlReporter = require('protractor-beautiful-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var AllureReporter = require('jasmine-allure-reporter');

var baseDirectory = "H:/Protractor Project/Allure";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var h = today.getHours().toString();
var m = today.getMinutes().toString();
var s = today.getSeconds().toString();

today = yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;

// Date.prototype.yyyymmdd = function () {
//     function pad(n) {
//         return ("0" + n).slice(-2);
//     }

//     var yyyy = this.getFullYear().toString();
//     var mm = (this.getMonth() + 1).toString(); //getMonth is zero based
//     var dd = this.getDate().toString();
//     var h = this.getHours().toString();
//     var m = this.getMinutes().toString();
//     var s = this.getSeconds().toString();
//     return yyyy + "-" + (mm[1] ? mm : '0' + mm[0]) + "-" + (dd[1] ? dd : '0' + dd[0]) + " " + h + ":" + m + ":" + s;yyyy + "-" + (mm[1] ? mm : '0' + mm[0]) + "-" + (dd[1] ? dd : '0' + dd[0]) + " " + h + ":" + m + ":" + s;
// };

exports.config = {

    directConnect: true,
    chromeDriver: './chromedriver.exe',
    framework: 'jasmine2',
    suites: {
        smoke: [//'src/app/specs/homepage_spec.js',
            'src/app/specs/productionsummary_spec.js',
            //'src/app/specs/forecastvsactual_spec.js',
            //'src/app/specs/downtimesummary_spec.js'
        ]
    },

    onPrepare: function () {

        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

        //Jasmine2Reporter
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'tmp/screenshots'
        }).getJasmine2Reporter());

        //Jasmine-spec-Reporter

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        //Allure Reporting
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: '/allure-results',
            consolidateAll: false,
        }));
        //jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    },

    allScriptsTimeout: 300000,

    jasmineNodeOpts: {
        defaultTimeOutInterval: 1000000,
        print: function () { }
    },
    baseUrl: "http://webuidev/ipso/"
};



















// var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
// var jasmineReporters = require('jasmine-reporters');

// var reportsDirectory = './reports';
// var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
// var detailsReportDirectory = reportsDirectory + '/detailReport';

// var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
//     dest: detailsReportDirectory,
//     filename: 'E2ETestingReport.html',
//     reportTitle: "E2E Testing Report",
//     showSummary: true,
//     reportOnlyFailedSpecs: false,
//     captureOnlyFailedSpecs: true,
// });






// // jasmine.getEnv().addReporter(new AllureReporter({
//         //     resultsDir: reportsDirectory + '/allure-results'
//         //     })); 





// 		jasmine.getEnv().addReporter(ScreenshotAndStackReporter);
//         // xml report generated for dashboard
//         jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
//             consolidateAll: true,
//             savePath: reportsDirectory + '/xml',
//             filePrefix: 'xmlOutput'
//         }));

//         var fs = require('fs-extra');
//         if (!fs.existsSync(dashboardReportDirectory)) {
//             fs.mkdirSync(dashboardReportDirectory);
//         }

//         jasmine.getEnv().addReporter({
//             specDone: function (result) {
//                 if (result.status == 'failed') {
//                     browser.getCapabilities().then(function (caps) {
//                         var browserName = caps.get('browserName');

//                         browser.takeScreenshot().then(function (png) {
//                             var stream = fs.createWriteStream(dashboardReportDirectory + '/' + result.fullName + '.png');
//                             stream.write(new Buffer(png, 'base64'));
//                             stream.end();
//                         });
//                     });
//                 }
//             }
//         });
//     },

//     onComplete: function () {
//         var browserName, browserVersion;
//         var capsPromise = browser.getCapabilities();

//         capsPromise.then(function (caps) {
//             browserName = caps.get('browserName');
//             browserVersion = caps.get('version');
//             platform = caps.get('platform');

//             var HTMLReport = require('protractor-html-reporter-2');
//             testConfig = {
//                 reportTitle: 'Protractor Test Execution Report',
//                 outputPath: dashboardReportDirectory,
//                 outputFilename: 'index',
//                 screenshotPath: './',
//                 testBrowser: browserName,
//                 browserVersion: browserVersion,
//                 modifiedSuiteName: false,
//                 screenshotsOnlyOnFailure: true,
//                 testPlatform: platform
//             };
//             new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
//         });
//     },

//     beforeLaunch: function () {
//         return new Promise(function (resolve) {
//             ScreenshotAndStackReporter.beforeLaunch(resolve);
//         });
//     },