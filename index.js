const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const argv = require('yargs').argv;
// console.log('argv-----', argv);

let deviceName;
deviceName = argv.device;
const deviceFlag = !!deviceName;

const base = require('./src/base');
const jobs = require('./src/jobs');

const URL = 'https://www.google.com';
const fileName = deviceFlag ? 'final-mobile.csv' : 'final.csv';

let browser;
let queryList;
queryList = [];

const cb = (err) => {
  if (err) {
    console.error(err);
  }
  // console.log('file saved');
};

const init = async (query) => {
  fs.appendFile(fileName, '\n', cb);

  // const browser = await base.start();
  const page = await base.open(browser, URL, deviceName);
  await base.search(page, query, deviceFlag);
  let data = await jobs.hasCardResult(page, deviceFlag);

  if (data && data.length > 0) {
    data = await jobs.goToGoogleJobsPage(page, deviceFlag);
    // console.log('here', data);
    if (data.length > 0) {
      fs.appendFile(fileName, `${query}\n`, cb);
      const fields = ['rank', 'title', 'via'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(data);
      // console.log(csv);
      fs.appendFile(fileName, csv, cb);
      fs.appendFile(fileName, '\n', cb);
      fs.appendFile(fileName, '\n', cb);
    }
  }
  await page.close();
  // await base.stop(browser);
};

const start = async () => {
  browser = await base.start();

  for (let i = 0; i < queryList.length; ++i) {
    await init(queryList[i]);
    console.log(i, 'done');
  }
  await base.stop(browser);

};

start();
