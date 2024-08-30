import { Router } from "express";
import { fetchChapterController } from "./controllers";
const router = Router();

router.get("/read/:mangaId/:chapterId", fetchChapterController);

export default router;
