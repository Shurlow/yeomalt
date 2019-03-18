const chrome = require('chrome-aws-lambda')
const puppeteer = chrome.puppeteer

async function getToken(path) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto(path);
  const username = await page.$('input[name=username')
  const password = await page.$('input[name=password')
  await username.type(process.env.IG_USERNAME)
  await password.type(process.env.IG_PASSWORD)
  await password.press('Enter')
  await page.waitFor(2000)
  const url = await page.evaluate('location.href')
  await browser.close();
  return url.split('=')[1]
}

module.exports = getToken