// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
const width = 1024;
const height = 800;

exports.start = async () => {
  let browser = await puppeteer.launch({
    headless: false,
    // slowMo: 80,
    args: [`--window-size=${width}, ${height}`]
  });
  return browser;
};

async function getPage(browser) {
  let page = await browser.newPage();
  await page.setViewport({width, height});
  return page;
}

exports.open = async (browser, url) => {
  let page = await getPage(browser);
  await Promise.all([
    page.goto(url),
    page.waitForNavigation()
  ]);
  return page;
};

exports.stop = async (browser) => {
  browser.close();
};

exports.getSearchInput = async (page) => {
  const qSelector = 'input.gLFyf.gsfi';
  const searchInput = await page.$(qSelector);
  return searchInput;
};

exports.search = async (page, query) => {
  const searchInput = await getSearchInput(page);
  await searchInput.type(query);
  await searchInput.press('Enter');
  await page.waitForNavigation();
};
