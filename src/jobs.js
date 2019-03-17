exports.hasCardResult = async (page, deviceFlag) => {
  let resultSelector = '#search .bkWMgd';
  resultSelector = deviceFlag ? '#ires #rso' : resultSelector;
  await page.waitForSelector(resultSelector);
  const data = await page.evaluate(async (resultSelector) => {
    const selectors = Array.from(document.querySelectorAll(resultSelector));
    return selectors;
  }, resultSelector);
  return data;
};

exports.goToGoogleJobsPage = async (page, deviceFlag) => {
  const resultSelector = '.PaEvOc.gws-horizon-textlists__li-ed';
  const viaSelector = '.k8RiQ.nsol9b.hxSlV .k8RiQ';

  let resultSearchId = '';
  let titleSelector = '';
  if (deviceFlag) {
    resultSearchId = '#ires #rso .N60dNb';
    titleSelector = '.BjJfJf.gsrt.wFHAad';
  } else {
    resultSearchId = '#search g-link a';
    titleSelector = '.BjJfJf.gsrt.LqLjSc';
  }

  try {
    await page.click(resultSearchId);
  } catch (e) {
    return [];
  }

  if (!deviceFlag) {
    await page.waitForNavigation();
  }

  await page.waitForSelector(resultSelector);
  const data = await page.evaluate(async (resultSelector, titleSelector, viaSelector) => {
    let jobLinks = Array.from(document.querySelectorAll(resultSelector));
    jobLinks = jobLinks.splice(0, 10);

    return jobLinks.map((link, index) => {
      const obj = {};
      obj.title = link.querySelector(titleSelector).innerText;
      obj.via = link.querySelector(viaSelector).innerText;
      obj.rank = index + 1;

      return obj;
    });
  }, resultSelector, titleSelector, viaSelector);

  return data;
};
