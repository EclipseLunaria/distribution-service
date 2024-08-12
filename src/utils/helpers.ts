import path from "path";
import { config as loadEnv } from "dotenv";
if (!process.env.NODE_ENV) {
  loadEnv();
}
const CONTENT_DIR =
  process.env.NODE_ENV !== "production"
    ? path.join(__dirname + `../../.local`)
    : "/var/www/cdn";

const CONTENT_URL_BASE =
  process.env.NODE_ENV !== "production"
    ? `file://${CONTENT_DIR}`
    : "https://cdn.eclipselunaria.dev";
console.log(CONTENT_DIR);
export const sortByPageNumber = (a?: string, b?: string) => {
  if (!a || !b) return 0;
  const aNum = parseInt(a.split("/").pop()!.split(".")[0].split("-").pop()!);
  const bNum = parseInt(b.split("/").pop()!.split(".")[0].split("-").pop()!);
  return aNum - bNum;
};

export const getPageUrl = (
  mangaId: string,
  chapterId: string,
  pageNumber: number
) => {
  return `${CONTENT_URL_BASE}/${mangaId}/${chapterId}/${pageNumber}.png`;
};

export const getChapterDir = (mangaId: string, chapterId: string) => {
  return `${CONTENT_DIR}/${mangaId}/${chapterId}`;
};
