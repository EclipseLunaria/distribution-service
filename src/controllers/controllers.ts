import { Request, Response } from "express";
import { loadChapter } from "../services/storageServices";
const getMangaChapter = async (req: Request, res: Response) => {
  // get mangaId and chapterId from the request
  const { mangaId, chapterId } = req.params;
  try {
    // load the chapter from the local storage
    const chapter = await loadChapter(mangaId, chapterId);
    // return the chapter
    res.json(chapter);
  } catch (error) {}
};

export { getMangaChapter };
