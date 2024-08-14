import { ElementHandle, Page } from "puppeteer";
import { openPage } from "../utils/extractionUtils";
import { storePage } from "./storageServices";
import fs from "fs-extra";
import { sortByPageNumber } from "../utils/helpers";
import { getChapterDir } from "../utils/helpers";

export const fetchChapterLocally = async (
  mangaId: string,
  chapterId: string
) => {
  const chapterDir = getChapterDir(mangaId, chapterId);
  const files = fs.readdirSync(chapterDir);
  return files.sort(sortByPageNumber).map((file) => `${chapterDir}/${file}`);
};

export const extractChapterFromSite = async (
  mangaId: string,
  chapterId: string
) => {
  const page = await openPage(
    `https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`
  );

  // page.
  let index = 0;
  const urls: string[] = [];
  for (const element of await page.$$(".container-chapter-reader img")) {
    console.log(`Extracting page ${index}`);

    const screenshot = await screenshotElement(element, page);
    if (screenshot) {
      urls.push(await storePage(mangaId, chapterId, index, screenshot));
      index++;
    }
  }
  console.log("found urls:", urls);

  return urls;
};

export const screenshotElement = async (
  element: ElementHandle,
  page: Page
): Promise<Buffer | null> => {
  const boundingBox = await element.boundingBox();
  if (!boundingBox || boundingBox.height < 900) {
    return null;
  }

  await page.evaluate((boundingBox) => {
    window.scrollTo(boundingBox.x, boundingBox.y);
  }, boundingBox);
  // remove element with id top from html
  const topElem = await page.$("#top");
  await page.evaluate((topElem) => {
    topElem?.remove();
  }, topElem);

  return Buffer.from(await element.screenshot({
    type: "png",
  }));
};
