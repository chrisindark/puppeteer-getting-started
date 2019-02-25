const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const process = require('child_process');

const base = require('./src/base');
const jobs = require('./src/jobs');

const URL = 'https://www.google.com';
const fileName = 'final.csv';

const queryList = [
  // '12th pass government job', '12th pass jobs', 'accounting jobs', 'admin jobs', 'aeronautical engineering jobs',
  // 'agriculture jobs', 'air force jobs', 'air india jobs', 'airlines jobs', 'airport jobs', 'ambuja cement career',
  // 'autocad jobs', 'ayurveda jobs', 'back office jobs', 'banking jobs', 'beautician jobs', 'big bazaar job', 'cab driver jobs',
  // 'cafe coffee day jobs', 'delivery boy jobs', 'exide jobs', 'field job', 'film industry jobs', 'handwriting work from home',
  // 'metro jobs', 'part time jobs', 'police jobs', 'tailoring jobs', 'tata steel jobs', 'clerk vacancy', 'collection jobs',
  // 'ca jobs', 'computer typist jobs', 'cook jobs', 'fashion design jobs', 'garment jobs', 'diesel mechanic jobs',
  // 'jobs in delhi', 'jobs in bangalore', 'jobs in hyderabad', 'jobs in mumbai', 'lafarge jobs', 'jp cement jobs',
  // 'car mechanic jobs', 'honda two wheeler company jobs', 'tata steel jobs', 'yfc project jobs', 'online jobs',
  // 'full time jobs', 'graphic designer jobs',

  // 'accountant job in bangalore', 'accountant job in mumbai', 'accountant jobs in delhi', 'accountant jobs in hyderabad', 'back office job in bangalore',
  // 'back office job in kochi', 'back office jobs in bangalore', 'back office jobs in chennai', 'beautician jobs in bangalore', 'beautician jobs in chennai',
  // 'beautician jobs in hyderabad', 'bpo jobs in bangalore', 'bpo jobs in chennai', 'call center jobs in bangalore', 'call center jobs in delhi',
  // 'call center jobs in hyderabad', 'carpenter jobs in bangalore', 'carpenter jobs in delhi', 'carpenter jobs in mumbai', 'cashier jobs in chennai',
  // 'content writing jobs in bangalore', 'data collection job in kolkata', 'data entry jobs in bangalore', 'data entry jobs in chennai', 'data entry jobs in delhi',
  // 'data entry jobs in kolkata', 'delivery jobs in hyderabad', 'driver job in mumbai', 'driving jobs in bangalore', 'gym trainer jobs in bangalore',
  // 'hospital jobs in bangalore', 'hr jobs in delhi', 'hr jobs in hyderabad', 'machine operator jobs in kochi', 'marketing jobs in bangalore',
  // 'mechanic jobs in bangalore', 'nursing jobs in bangalore', 'office helper jobs in gurgaon', 'painting jobs in delhi', 'plumber jobs in kolkata',
  // 'receptionist jobs in bangalore', 'sales jobs in bangalore', 'sales jobs in kolkata', 'security guard jobs in bangalore', 'security jobs in bangalore',
  // 'tailor jobs in mumbai', 'teacher jobs in ahmedabad', 'teaching jobs in bangalore', 'teaching jobs in delhi', 'wedding planner jobs in delhi',
];

const cb = (err) => {
  if (err) {
    console.error(err);
  }
  // console.log('file saved');
};

const init = async (query) => {
  fs.appendFile(fileName, '\n', cb);

  const browser = await base.start();
  const page = await base.open(browser, URL);
  await base.search(page, query);
  let data = await jobs.hasCardResult(page);

  if (data && data.length > 0) {
    data = await jobs.goToGoogleJobsPage(page);
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

  await base.stop(browser);
};

const start = async () => {
  for (let i = 0; i < queryList.length; ++i) {
    await init(queryList[i]);
    console.log(i, 'done');
  }
};

start();
