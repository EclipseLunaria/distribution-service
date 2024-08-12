import fs, { ensureDirSync } from "fs-extra";
import path from "path";
import { config as loadEnv } from "dotenv";
import {
  extractChapterFromSite,
  fetchChapterLocally,
} from "./extractionServices";

if (!process.env.NODE_ENV) {
  loadEnv();
}

const CONTENT_DIR = process.env.NODE_ENV
  ? path.join(__dirname + `../../.local`)
  : "/chap";

const getChapterDir = (mangaId: string, chapterId: string) => {
  return `${CONTENT_DIR}/${mangaId}/${chapterId}`;
};

const storePage = async (
  mangaId: string,
  chapterId: string,
  pageNumber: number,
  screenshot: Buffer
) => {
  // Ensure the directory exists
  console.log("Content dir:", CONTENT_DIR);
  const CHAPTER_DIR = getChapterDir(mangaId, chapterId);
  ensureDirSync(CHAPTER_DIR);
  // store the screenshot in the local storage
  const pageUri = `${CHAPTER_DIR}/${pageNumber}.png`;
  fs.writeFileSync(pageUri, screenshot);
  return pageUri;
};

const loadChapter = async (mangaId: string, chapterId: string) => {
  // if chapter exists
  if (chapterExists(mangaId, chapterId)) {
    return fetchChapterLocally(mangaId, chapterId);
  }
  // if chapter does not exist
  // extract the chapter from the site
  return await extractChapterFromSite(mangaId, chapterId);
};

const chapterExists = (mangaId: string, chapterId: string) => {
  return fs.existsSync(getChapterDir(mangaId, chapterId));
};

export { chapterExists, storePage, loadChapter, getChapterDir };
