import { Router } from "express";
import { getMangaChapter } from "../controllers/controllers";
const router = Router();

// get manga chapter => list of urls
router.get("/read/:mangaId/:chapterId", getMangaChapter);

// chapter exists

export default router;
