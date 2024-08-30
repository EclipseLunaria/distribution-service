import puppeteer, { Browser, HTTPResponse } from "puppeteer";
import fs from "fs-extra";
import { fetchChapterUrls, getChapterDir } from "./utils";

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

const loadChapter = async (mangaId: string, chapterId: string) => {
  if (!fs.existsSync(getChapterDir(mangaId, chapterId))) {
    console.log(
      `Manga: ${mangaId} Chapter: ${chapterId} not found: downloading from source`
    );

    await downloadChapter(mangaId, chapterId);
  }

  return fetchChapterUrls(mangaId, chapterId);
};

export { loadChapter };

const downloadChapter = async (mangaId: string, chapterId: string) => {
  const OUT_DIR = getChapterDir(mangaId, chapterId);
  fs.ensureDirSync(OUT_DIR);

  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", (request) => request.continue());
  page.on("response", handleChapterResponse(OUT_DIR));

  await page.goto(
    `https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`,
    { waitUntil: "networkidle2" }
  );
  console.log("downloaded:", mangaId, chapterId);
};

const handleChapterResponse =
  (outDir: string) => async (response: HTTPResponse) => {
    const url = response.url();
    if (
      response.request().resourceType() === "image" &&
      url.includes("mkklcdn")
    ) {
      const contentType = response.headers()["content-type"].split(/\//g).pop();
      const pageNumber = url.split(/\//g).pop()?.split("-")[0];
      console.log("Downloading page:", pageNumber, "from ", url);
      await fs.writeFile(
        `${outDir}/${pageNumber}.${contentType}`,
        await response.content()
      );
    }
  };
