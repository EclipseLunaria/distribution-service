import { Request, Response } from "express";
import { loadChapter } from "./services";

const fetchChapterController = async (req: Request, res: Response) => {
  const { mangaId, chapterId } = req.params;
  try {
    const chapter = await loadChapter(mangaId, chapterId);
    res.json(chapter);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
};

export { fetchChapterController };
