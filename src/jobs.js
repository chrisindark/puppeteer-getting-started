exports.hasCardResult = async (page) => {
  const resultSelector = '#search .bkWMgd';
  await page.waitForSelector(resultSelector);
  const data = await page.evaluate((resultSelector) => {
    return {
      selectors: document.querySelectorAll(resultSelector),
      length: document.querySelectorAll(resultSelector).length
    };
  }, resultSelector);
  return data;
};

exports.goToGoogleJobsPage = async (page) => {
  const resultSearchId = '#search g-link a';
  try {
    await page.click(resultSearchId);
  } catch (e) {
    return [];
  }

  await page.waitForNavigation();
  const resultSelector = '.PaEvOc.gws-horizon-textlists__li-ed';
  await page.waitForSelector(resultSelector);
  const data = await page.evaluate((resultSelector) => {
    const jobLinks = Array.from(document.querySelectorAll(resultSelector));

    return jobLinks.map((link, index) => {
      const obj = {};
      obj.title = link.querySelector('.BjJfJf.gsrt.LqLjSc').innerText;
      obj.via = link.querySelector('.k8RiQ.nsol9b.hxSlV .k8RiQ').innerText;
      obj.rank = index + 1;

      return obj;
    });
  }, resultSelector);
  return data;
};

