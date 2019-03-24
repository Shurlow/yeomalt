const chrome = require('chrome-aws-lambda')
const puppeteer = chrome.puppeteer
const { IG_CLIENT_ID, IG_REDIRECT } = process.env
const authPath = `https://api.instagram.com/oauth/authorize/?client_id=${IG_CLIENT_ID}&redirect_uri=${IG_REDIRECT}&response_type=token`

module.exports = async function scrapeToken(req, res) {
  console.log('Scraping page...');
  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    
    const page = await browser.newPage();
    await page.goto(authPath);
    const username = await page.$('input[name=username')
    const password = await page.$('input[name=password')
    await username.type(process.env.IG_USERNAME)
    await password.type(process.env.IG_PASSWORD)
    await password.press('Enter')
    await page.waitFor(3000)
    const url = await page.evaluate('location.href')
    const access_token = url.split('=')[1]
    await browser.close();
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ access_token }))
  } catch (error) {
    console.error('Scraping error:', error);
    res.statusCode = 500
    res.end('Authentication Error')
  }
}