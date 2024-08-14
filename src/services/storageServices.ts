import fs, { ensureDirSync } from "fs-extra";
import { getChapterDir, getPageUrl } from "../utils/helpers";
import {
  extractChapterFromSite,
  fetchChapterLocally,
} from "./extractionServices";


const storePage = async (
  mangaId: string,
  chapterId: string,
  pageNumber: number,
  screenshot: Buffer
) => {
  // Ensure the directory exists
  const CHAPTER_DIR = getChapterDir(mangaId, chapterId);
  ensureDirSync(CHAPTER_DIR);
  const pageFileName = `${pageNumber}.png`
  // store the screenshot in the local storage
  
  const pageUri = `${CHAPTER_DIR}/${pageFileName}`;
  fs.writeFileSync(pageUri, screenshot);
  return getPageUrl(mangaId, chapterId, `${pageFileName}`);
};

const loadChapter = async (mangaId: string, chapterId: string) => {
  // if chapter exists
  if (chapterExists(mangaId, chapterId)) {
    console.log("chapter exists:", chapterId)
    return await fetchChapterLocally(mangaId, chapterId);
  }
  // if chapter does not exist
  // extract the chapter from the site
  console.log("scraping chapter:", chapterId)
  return await extractChapterFromSite(mangaId, chapterId);
};

const chapterExists = (mangaId: string, chapterId: string) => {
  return fs.existsSync(getChapterDir(mangaId, chapterId));
};

export { chapterExists, storePage, loadChapter };
