const csvtojson = require('csvtojson');
const fs = require('fs');


const firstCharUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const readCsvFile = () => {
  const csvFilePath = __dirname + '/../../Quikr-Swiggy-Utm-Worksheet.csv';
  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      // console.log(jsonObj);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */

      var configObj = {};
      jsonObj.forEach((value, index) => {
        configObj[`b${index + 10}`] = {
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
        };
      });

      writeJsonFile(configObj);
    });
};

readCsvFile();

export const writeJsonFile = (jsonObj) => {
  const jsonContent = JSON.stringify(jsonObj);

  fs.writeFile(__dirname + '/../../Quikr-Swiggy-Utm-Worksheet.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
};

// writeJsonFile();
