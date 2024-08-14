import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

let browser: Browser | null = null;

const getBrowser = async () => {

  if (browser === null) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browser;
};

const openPage = async (url: string) => {
  console.log("opening page")
  const browser = await getBrowser();
  console.log('opened page')

  const page = await browser.newPage();
  await page.goto(url);
  return page;
};

const closeBrowser = async () => {
  if (browser !== null) {
    await browser.close();
    browser = null;
  }
};

export { getBrowser, openPage, closeBrowser };
