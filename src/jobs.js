exports.hasCardResult = async (page, deviceFlag) => {
  let resultSelector = '#search .bkWMgd';
  resultSelector = deviceFlag ? '#rso' : resultSelector; // id of the div above g-card
  await page.waitForSelector(resultSelector);
  const data = await page.evaluate(async (resultSelector) => {
    const selectors = Array.from(document.querySelectorAll(resultSelector));
    return selectors;
  }, resultSelector);
  return data;
};

exports.goToGoogleJobsPage = async (page, deviceFlag) => {
  const resultSelector = '.iFjolb.gws-plugins-horizon-jobs__li-ed';
  let viaSelector = '';

  let resultSearchId = '';
  let titleSelector = '';
  if (deviceFlag) {
    resultSearchId = '#rso .iI6nue.nA3Vyd.ndEm3b';
    titleSelector = '.BjJfJf.PUpOsf.gsrt';
    viaSelector = '.oNwCmf .Qk80Jf';
  } else {
    resultSearchId = '#search g-link a';
    titleSelector = '.BjJfJf.PUpOsf.gsrt';
    viaSelector = '.oNwCmf .Qk80Jf'
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
      link.querySelectorAll(viaSelector).forEach((value, index) => {
        if (index === 1) {
          obj.via = value.innerText;
        }
      });
      obj.rank = index + 1;

      return obj;
    });
  }, resultSelector, titleSelector, viaSelector);

  return data;
};
