const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
// console.log('devices-----', devices);

const defaultDevice = devices['Nexus 5X'];
const width = 800;
const height = 600;

exports.start = async () => {
  let browser = await puppeteer.launch({
    headless: false,
    // slowMo: 80,
    args: [`--window-size=${width},${height} --window-position=0,0 --window-size=1,1`]
  });
  return browser;
};

async function getPage(browser, deviceName) {
  let page = await browser.newPage();
  if (typeof deviceName !== 'undefined' && deviceName) {
    const device = devices[deviceName] ? devices[deviceName] : defaultDevice;
    await page.emulate(device);
  } else {
    await page.setViewport({width, height});
  }
  return page;
}

exports.open = async (browser, url, deviceName) => {
  let page = await getPage(browser, deviceName);
  await Promise.all([
    page.goto(url),
    page.waitForNavigation()
  ]);
  return page;
};

exports.stop = async (browser) => {
  browser.close();
};

const getSearchInput = async (page, deviceFlag) => {
  let qSelector = 'input.gLFyf.gsfi';
  qSelector = deviceFlag ? 'input.gLFyf' : qSelector;
  const searchInput = await page.$(qSelector);
  return searchInput;
};

exports.search = async (page, query, deviceFlag) => {
  const searchInput = await getSearchInput(page, deviceFlag);
  await searchInput.type(query);
  await searchInput.press('Enter');
  await page.waitForNavigation();
};
