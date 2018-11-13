var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should navigate to homepage and validate if GOM and GHANA are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542102979057,
                "type": ""
            }
        ],
        "screenShotFile": "007200d0-0033-00f9-00e4-0055008200b7.png",
        "timestamp": 1542102976650,
        "duration": 9950
    },
    {
        "description": "should navigate to GOM Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ed0091-0040-0014-00fa-0020005500a8.png",
        "timestamp": 1542102987659,
        "duration": 8150
    },
    {
        "description": "should navigate to GHANA Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00140044-009f-006a-005e-00730079007a.png",
        "timestamp": 1542102996448,
        "duration": 11330
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542103017770,
                "type": ""
            }
        ],
        "screenShotFile": "0059005a-00e2-0042-00f0-009800e2004d.png",
        "timestamp": 1542103008307,
        "duration": 10784
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0092000e-00d5-0037-0054-0016007e0094.png",
        "timestamp": 1542103019430,
        "duration": 10189
    },
    {
        "description": "should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004f0030-001e-00db-00f2-003100eb00ce.png",
        "timestamp": 1542103029980,
        "duration": 11988
    },
    {
        "description": "should navigate to GHANA Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00df0083-00e1-00dd-003b-00c200030013.png",
        "timestamp": 1542103042314,
        "duration": 9787
    },
    {
        "description": "should navigate to GOM Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bc00ae-00ff-001b-00d1-00f2009c0053.png",
        "timestamp": 1542103052425,
        "duration": 10399
    },
    {
        "description": "should navigate to GHANA Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00740036-000b-00e5-00b0-008600c80089.png",
        "timestamp": 1542103063191,
        "duration": 10294
    },
    {
        "description": "should navigate to homepage and validate if GOM and GHANA are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542103247938,
                "type": ""
            }
        ],
        "screenShotFile": "000400a2-0019-00fc-001f-005c00a200ae.png",
        "timestamp": 1542103245775,
        "duration": 9080
    },
    {
        "description": "should navigate to GOM Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0039006c-00eb-0032-0018-00f4006c0044.png",
        "timestamp": 1542103255999,
        "duration": 8757
    },
    {
        "description": "should navigate to GHANA Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009c00d8-0031-0064-0028-006b00ca0066.png",
        "timestamp": 1542103265310,
        "duration": 11700
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542103287351,
                "type": ""
            }
        ],
        "screenShotFile": "0066000e-00e9-0055-0006-0044006d00ed.png",
        "timestamp": 1542103277753,
        "duration": 10920
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b800b4-0088-0033-0021-004300cb00fb.png",
        "timestamp": 1542103289027,
        "duration": 10653
    },
    {
        "description": "should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00950086-009b-006b-0004-00dc005a00e8.png",
        "timestamp": 1542103300056,
        "duration": 12222
    },
    {
        "description": "should navigate to GHANA Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0095007a-0045-009f-002b-003c00b700b3.png",
        "timestamp": 1542103312679,
        "duration": 10391
    },
    {
        "description": "should navigate to GOM Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00dc0053-0048-0046-00ac-002d00350076.png",
        "timestamp": 1542103323440,
        "duration": 11408
    },
    {
        "description": "should navigate to GHANA Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f200b5-00dd-0009-00f9-008d0045008d.png",
        "timestamp": 1542103335293,
        "duration": 10961
    },
    {
        "description": "should navigate to homepage and validate if GOM and GHANA are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542103486854,
                "type": ""
            }
        ],
        "screenShotFile": "00ff001b-0043-0097-0070-0093007400a9.png",
        "timestamp": 1542103484847,
        "duration": 8886
    },
    {
        "description": "should navigate to GOM Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004b00f3-00c4-00b9-0027-007100d7005a.png",
        "timestamp": 1542103494880,
        "duration": 8618
    },
    {
        "description": "should navigate to GHANA Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a30031-00bc-0078-00cf-003e001200ea.png",
        "timestamp": 1542103504050,
        "duration": 11762
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542103526002,
                "type": ""
            }
        ],
        "screenShotFile": "00770029-0037-0015-0032-0017004c0004.png",
        "timestamp": 1542103516367,
        "duration": 10987
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ba0063-009f-0051-0024-00ab009800bc.png",
        "timestamp": 1542103527706,
        "duration": 11164
    },
    {
        "description": "should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a50009-00fd-0098-00a3-003800c00067.png",
        "timestamp": 1542103539231,
        "duration": 12583
    },
    {
        "description": "should navigate to GHANA Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007a00d8-001d-00b3-00e8-006200a500f7.png",
        "timestamp": 1542103552180,
        "duration": 10198
    },
    {
        "description": "should navigate to GOM Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00750080-00ea-009b-00e6-001f00c0001d.png",
        "timestamp": 1542103562734,
        "duration": 10731
    },
    {
        "description": "should navigate to GHANA Downtime Summary page and validate if all the components are displayed|Downtime Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d3001a-0022-0010-005f-005800690043.png",
        "timestamp": 1542103573869,
        "duration": 10467
    },
    {
        "description": "should navigate to homepage and validate if GOM and GHANA are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16440,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at Object.resolve (path.js:193:28)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542106433329,
                "type": ""
            }
        ],
        "screenShotFile": "00770002-00be-0019-0012-00c0000b00be.png",
        "timestamp": 1542106431140,
        "duration": 23339
    },
    {
        "description": "should navigate to GOM Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16440,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e00042-007f-00e4-0012-008a0065000a.png",
        "timestamp": 1542106455645,
        "duration": 23652
    },
    {
        "description": "should navigate to homepage and validate if GOM and GHANA are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at Object.resolve (path.js:193:28)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542106757621,
                "type": ""
            }
        ],
        "screenShotFile": "006e00f4-0015-0038-0094-00d3000a0060.png",
        "timestamp": 1542106755281,
        "duration": 23446
    },
    {
        "description": "should navigate to GOM Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation\\Protractor ProjectAllure'"
        ],
        "trace": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation\\Protractor ProjectAllure'\n    at Object.fs.mkdirSync (fs.js:885:18)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:70:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c10090-00b7-0050-0013-002800b00008.png",
        "timestamp": 1542106779923,
        "duration": 23524
    },
    {
        "description": "should navigate to GHANA Dashboard and check if all the fields and components are displayed|Navigation to Home Page and GOM/GHANA Daily Dashboard Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "009800d9-003a-0047-0047-00e200840016.png",
        "timestamp": 1542106803943,
        "duration": 27745
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542106857426,
                "type": ""
            }
        ],
        "screenShotFile": "002700f7-00ab-0058-00bb-004e00de0028.png",
        "timestamp": 1542106847459,
        "duration": 25475
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at Object.resolve (path.js:193:28)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e20006-0073-009f-0029-001d0076001c.png",
        "timestamp": 1542106873306,
        "duration": 25220
    },
    {
        "description": "should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed|Forecast vs Actual Production Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 10013ms",
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 10013ms\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (H:\\Protractor Project\\IPSO-Test-Automation\\src\\app\\specs\\forecastvsactual_spec.js:15:11)\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should navigate to GOM Forecast vs Actual production page and validate if all the components are displayed\") in control flow\n    at UserContext.<anonymous> (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (H:\\Protractor Project\\IPSO-Test-Automation\\src\\app\\specs\\forecastvsactual_spec.js:13:2)\n    at addSpecsToSuite (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (H:\\Protractor Project\\IPSO-Test-Automation\\src\\app\\specs\\forecastvsactual_spec.js:11:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)",
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b000c3-0059-007c-009b-00690003007c.png",
        "timestamp": 1542106913605,
        "duration": 23536
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542107127320,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542107140001,
                "type": ""
            }
        ],
        "screenShotFile": "00dd00ca-0027-007b-0008-004700c8005d.png",
        "timestamp": 1542107125284,
        "duration": 29814
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at Object.resolve (path.js:193:28)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f200d3-002e-0068-0005-000400f7005b.png",
        "timestamp": 1542107155748,
        "duration": 25369
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6776,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542107340582,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542107352807,
                "type": ""
            }
        ],
        "screenShotFile": "00b8004d-00f8-00ce-0073-000400b00035.png",
        "timestamp": 1542107338381,
        "duration": 15826
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6776,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a700d1-00f0-0046-00a2-00c70059004f.png",
        "timestamp": 1542107354858,
        "duration": 10728
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542107455273,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542107467484,
                "type": ""
            }
        ],
        "screenShotFile": "00680027-009d-00df-00c4-00dd0086006e.png",
        "timestamp": 1542107453297,
        "duration": 15524
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e100df-00ff-00c0-00a9-00e600670092.png",
        "timestamp": 1542107469510,
        "duration": 10774
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542107563100,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542107575730,
                "type": ""
            }
        ],
        "screenShotFile": "00f20061-000c-0099-0089-005f002600d6.png",
        "timestamp": 1542107560879,
        "duration": 30239
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\Allure'"
        ],
        "trace": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\Allure'\n    at Object.fs.mkdirSync (fs.js:885:18)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:70:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ed007f-00e2-0075-00c6-000400e9005a.png",
        "timestamp": 1542107591761,
        "duration": 25253
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542107800516,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542107814979,
                "type": ""
            }
        ],
        "screenShotFile": "005d0061-0092-00dd-009d-0066006a0007.png",
        "timestamp": 1542107798338,
        "duration": 18062
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005600b4-0031-0069-0022-00cb00e10023.png",
        "timestamp": 1542107817142,
        "duration": 10988
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542108274718,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542108287202,
                "type": ""
            }
        ],
        "screenShotFile": "00640064-0018-00cd-0067-001c002800f6.png",
        "timestamp": 1542108272738,
        "duration": 25934
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e6006d-00bd-00df-0042-003b00710055.png",
        "timestamp": 1542108299273,
        "duration": 22033
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12364,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542108802225,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542108815903,
                "type": ""
            }
        ],
        "screenShotFile": "00020009-00d9-00e9-007f-002e0036003b.png",
        "timestamp": 1542108800121,
        "duration": 28254
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12364,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation'"
        ],
        "trace": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation'\n    at Object.fs.mkdirSync (fs.js:885:18)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:70:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b3004d-00b1-00e7-008a-00b8005a009d.png",
        "timestamp": 1542108828989,
        "duration": 23361
    },
    {
        "description": "should navigate to GOM production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8852,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation'"
        ],
        "trace": [
            "Error: EEXIST: file already exists, mkdir 'H:\\Protractor Project\\IPSO-Test-Automation'\n    at Object.fs.mkdirSync (fs.js:885:18)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:70:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://webuidev/ipso/common/config.json - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1542108915567,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://webuidev/ipso/main.02e06814a3144a4967bb.js 0:1568194 \"Deprecation warning: moment().subtract(period, number) is deprecated. Please use moment().subtract(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.\"",
                "timestamp": 1542108927696,
                "type": ""
            }
        ],
        "screenShotFile": "0015007b-00bb-00ec-0050-00cf00ec0070.png",
        "timestamp": 1542108913359,
        "duration": 25775
    },
    {
        "description": "should navigate to GHANA production summary page and validate if all the components are displayed|Production Summary Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8852,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "RangeError: Maximum call stack size exceeded"
        ],
        "trace": [
            "RangeError: Maximum call stack size exceeded\n    at normalizeStringWin32 (path.js:33:30)\n    at Object.resolve (path.js:338:20)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:67:12)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:75:16)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)\n    at mkdirsSync (H:\\Protractor Project\\IPSO-Test-Automation\\node_modules\\allure-js-commons\\node_modules\\fs-extra\\lib\\mkdir.js:76:9)"
        ],
        "browserLogs": [],
        "screenShotFile": "000700d1-004b-001b-00e6-004300cd00de.png",
        "timestamp": 1542108939914,
        "duration": 21550
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
