"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeJsonFile = exports.readCsvFile = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var csvtojson = require('csvtojson');

var fs = require('fs');

var firstCharUpperCase = function firstCharUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var readCsvFile = function readCsvFile() {
  var csvFilePath = __dirname + '/../../Quikr-Swiggy-Utm-Worksheet.csv';
  csvtojson().fromFile(csvFilePath).then(function (jsonObj) {
    // console.log(jsonObj);

    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
    var configObj = [];
    jsonObj.forEach(function (value, index) {
      var config = _defineProperty({}, "b".concat(index + 10), {
        "alwaysOn": true,
        "city": [firstCharUpperCase(value['City Name'])],
        "roles": ["all"],
        "title": "Become a Delivery Partner with Swiggy",
        "description": "Earn up to Rs 30000 per month + 6 Lakhs Insurance benefits*",
        "bannerSource": ["snb", "vap"],
        "source": "PWA_PROMO",
        "subSource": "Swiggy",
        "imgSrc": "https://teja10.kuikr.com/images/jobs/swiggy.png",
        "formHeading": "Delivery Boys",
        "bannerType": "bannerForm",
        "redirectionUrl": value['Botlink']
      });

      configObj.push(config);
    });
    writeJsonFile(configObj);
  });
};

exports.readCsvFile = readCsvFile;
readCsvFile();

var writeJsonFile = function writeJsonFile(jsonObj) {
  var jsonContent = JSON.stringify(jsonObj);
  fs.writeFile(__dirname + '/../../Quikr-Swiggy-Utm-Worksheet.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}; // writeJsonFile();


exports.writeJsonFile = writeJsonFile;
