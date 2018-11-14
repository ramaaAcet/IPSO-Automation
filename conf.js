var HtmlReporter = require('protractor-beautiful-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var AllureReporter = require('jasmine-allure-reporter');
//var exec = require ('allure-commandline');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
var fs = require('fs-extra');

var today = new Date(),
    timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';
var reportPath = 'reports/Allure-Results ' + timeStamp;
var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport' + timeStamp;
var detailsReportDirectory = reportsDirectory + '/detailReport' + timeStamp;

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
    dest: detailsReportDirectory,
    filename: 'E2ETestingReport.html',
    reportTitle: "E2E Testing Report",
    showSummary: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
});

exports.config = {

    directConnect: true,
    chromeDriver: './chromedriver.exe',

    framework: 'jasmine2',

    multiCapabilities: [
        {
            browserName: 'chrome',
            chromeOptions: {
                useAutomationExtension: false
            },
        },
    ],

    suites: {
        smoke: ['src/app/specs/homepage_spec.js',
            'src/app/specs/productionsummary_spec.js',
            'src/app/specs/forecastvsactual_spec.js',
            'src/app/specs/downtimesummary_spec.js'
        ]
    },

    onPrepare: function () {

        //browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

        //Jasmine2Reporter
        jasmine.getEnv().addReporter(new HtmlReporter({
            reportTitle: "Automation Report" + timeStamp,
            baseDirectory: 'reports/tmp/screenshots' + timeStamp,
            consolidateAll: false,
        }).getJasmine2Reporter());

        //Jasmine-spec-Reporter

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        //Allure Reporting
        jasmine.getEnv().addReporter(new AllureReporter({
            reportTitle: "Automation Allure Report" + timeStamp,
            resultsDir: reportPath,
            consolidateAll: false,
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });


        //protractor-html-reporter-2   
        jasmine.getEnv().addReporter(ScreenshotAndStackReporter);
        // xml report generated for dashboard
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: reportsDirectory + '/xml',
            filePrefix: 'xmlOutput'
        }));

        var fs = require('fs-extra');
        if (!fs.existsSync(dashboardReportDirectory)) {
            fs.mkdirSync(dashboardReportDirectory);
        }

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream(dashboardReportDirectory + '/' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
    },

    onComplete: function () {
        //exec('allure generate ' + '"' + reportPath + '/allure-result/' + '"' + ' -o ' + '"' + reportPath + '/allure-report/' + '"'); 
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');
            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: dashboardReportDirectory,
                outputFilename: 'index',
                screenshotPath: reportsDirectory,
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
        });

    },

    beforeLaunch: function () {
        return new Promise(function (resolve) {
            ScreenshotAndStackReporter.beforeLaunch(resolve);
        });
    },

    allScriptsTimeout: 300000,

    jasmineNodeOpts: {
        defaultTimeOutInterval: 1000000,
        print: function () { }
    },
    baseUrl: "http://webuidev/ipso/"
};